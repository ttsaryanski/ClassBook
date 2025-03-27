import { Navigate, Outlet } from "react-router";

import { useAuth } from "../../contexts/AuthContext";

export default function GuestGuard() {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
