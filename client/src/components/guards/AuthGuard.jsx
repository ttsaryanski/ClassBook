import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthGuard() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    return <Outlet />;
}
