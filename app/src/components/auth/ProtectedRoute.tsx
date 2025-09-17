import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
    children?: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p>Chargement...</p>;

    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

    return children ? <>{children}</> : <Outlet />;
};