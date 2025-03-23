import { createContext, useContext, useEffect, useState } from "react";

import { useError } from "./ErrorContext";

import { clssService } from "../services/clssService";

const ClassContext = createContext();

export function ClassProvider({ children }) {
    const { setError } = useError();
    const [clss, setClss] = useState([]);

    const refreshClasses = async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        try {
            const dataClass = await clssService.getAll(signal);
            setClss(dataClass);
        } catch (error) {
            if (!signal.aborted) {
                setError("Error fetching classes:", error.message);
            }
        }

        return () => abortController.abort();
    };

    useEffect(() => {
        refreshClasses();
    }, []);

    return (
        <ClassContext.Provider value={{ clss, setClss, refreshClasses }}>
            {children}
        </ClassContext.Provider>
    );
}

export const useClass = () => useContext(ClassContext);
