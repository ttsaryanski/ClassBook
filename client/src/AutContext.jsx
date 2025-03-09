import { createContext, useContext, useState, useEffect } from "react";

import { authService } from "./services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        try {
            const userData = await authService.profile();
            setUser(userData);
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const login = async (email, password) => {
        try {
            await authService.login({ email, password });
            await fetchData();
        } catch (err) {
            setUser(null);
            console.log(err.message);
        }
    };

    const logout = () => {
        const fetchData = async () => {
            try {
                await authService.logout();

                setUser(null);
            } catch (err) {
                setUser(null);
                console.log(err.message);
            }
        };

        fetchData();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
