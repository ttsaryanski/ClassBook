import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { authService } from "../services/authService";
import { useError } from "./ErrorContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { setError } = useError();

    const fetchUser = async () => {
        try {
            setError(null);
            const userData = await authService.profile();
            setUser(userData);
        } catch (err) {
            setUser(null);
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

    const login = async (email, password) => {
        try {
            setError(null);
            await authService.login({ email, password });
            await fetchUser();
            navigate("/");
        } catch (err) {
            setUser(null);
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
                navigate("/");
            } catch (err) {
                setUser(null);
                setError(err.message);
                throw err;
            }
        };

        fetchUser();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
