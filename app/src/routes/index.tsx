import { Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { PublicOnlyRoute } from "@/components/auth/PublicOnlyRoute"
import AppLayout from "@/layout/AppLayout"
import AuthLayout from "@/layout/AuthLayout"
import ContentLayout from "@/layout/ContentLayout.tsx"

// Pages publiques
import ResetPassword from "@/pages/ResetPassword"
import ForgotPassword from "@/pages/ForgotPassword"
import ConfirmEmail from "@/pages/ConfirmEmail"

// Pages d'authentification
import Login from "@/pages/Login"
import Register from "@/pages/Register"

// Pages protégées
import Profile from "@/pages/Profile"
import Home from "@/pages/Home.tsx"
import About from "@/pages/About"
import NotFound from "@/pages/NotFound.tsx";
import Proposal from "@/pages/Proposal.tsx";

export function AppRoutes() {
    return (
        <Routes>
            {/* Routes d'authentification (public mais avec redirection si connecté) */}
            <Route path="auth" element={<PublicOnlyRoute><AuthLayout/></PublicOnlyRoute>}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="confirm-email" element={<ConfirmEmail />} />
            </Route>

            {/* Routes protégées (auth requise) */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                {/* Redirection de la racine vers /random */}
                <Route path="/" element={<Navigate to="/random" replace />} />
                <Route path="random" element={<ContentLayout />}>
                    <Route index element={<Home />} />
                    <Route path=":id" element={<Home />} />
                </Route>
                {/* Profil utilisateur */}
                <Route path="profile" element={<Profile />} />
                {/* Page À propos */}
                <Route path="about" element={<About />} />
                <Route path="proposal" element={<Proposal />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
