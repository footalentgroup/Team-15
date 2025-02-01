"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@/ui/snackbars/successBar";

type SnackbarContextType = {
    showSnackbar: (message: string, type?: 'success' | 'error' | 'warning' | undefined) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar debe ser usado dentro de un SnackbarProvider");
    }
    return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<'success' | 'error' | 'warning' | undefined>('success');

    const showSnackbar = (msg: string, type?: 'success' | 'error' | 'warning' | undefined) => {
        setMessage(msg);
        if (type) {
            setType(type);
        }
    };

    const closeSnackbar = () => {
        setMessage(null);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {message && <Snackbar message={message} onClose={closeSnackbar} type={type} />}
        </SnackbarContext.Provider>
    );
};
