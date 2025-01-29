"use client";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthenticatedComponent = (props: any) => {
        useEffect(() => {
            const token = localStorage.getItem("token");

            if (!token) {
                window.location.replace("/login"); 
            }
        }, []);

        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
