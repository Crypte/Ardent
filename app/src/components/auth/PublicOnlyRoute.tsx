import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import type { ReactNode } from "react"

type PublicOnlyRouteProps = {
    children?: ReactNode
}

export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) return <p>Chargement...</p>

    if (isAuthenticated) return <Navigate to="/" replace />

    return children ? <>{children}</> : <Outlet />
}