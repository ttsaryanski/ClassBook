import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { authService } from "../services/authService";
import { useError } from "./ErrorContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const { setError } = useError();

    const [user, setUser] = useState(null);
    const [isDirector, setIsDirector] = useState(false);

    const fetchUser = async () => {
        try {
            setError(null);
            const userData = await authService.profile();
            setUser(userData);

            if (userData && userData.role === "director") {
                setIsDirector(true);
            }
        } catch (err) {
            setUser(null);
            setIsDirector(false);
            if (err.message === "Invalid token!") {
                setError(null);
            } else {
                setError(err.message);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
    };

    const login = async (email, password) => {
        try {
            setError(null);
            await authService.login({ email, password });
            await fetchUser();
            navigate("/");
        } catch (err) {
            setUser(null);
            setIsDirector(false);
            setError(err.message);
            throw err;
        }
    };

    const logout = () => {
        const fetchUser = async () => {
            try {
                setError(null);
                await authService.logout();
                setUser(null);
                setIsDirector(false);
                navigate("/");
            } catch (err) {
                setUser(null);
                setIsDirector(false);
                setError(err.message);
                throw err;
            }
        };

        fetchUser();
    };

    return (
        <AuthContext.Provider
            value={{ user, isDirector, login, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
