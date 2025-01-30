"use client";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AuthenticatedComponent = (props: any) => {
        const [isClient, setIsClient] = useState(false);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            setIsClient(true);
        }, []);

        useEffect(() => {
            if (isClient) {
                const token = localStorage.getItem("token");

                if (!token) {
                    window.location.replace("/login");
                } else {
                    setIsAuthenticated(true);
                }
            }
        }, [isClient]);

        if (!isClient || !isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;