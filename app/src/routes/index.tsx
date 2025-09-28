import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { PublicOnlyRoute } from "@/components/auth/PublicOnlyRoute"
import AppLayout from "@/layout/AppLayout"
import AuthLayout from "@/layout/AuthLayout"
import ArticleLayout from "@/layout/ArticleLayout.tsx"

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
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Routes protégées (auth requise) */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                {/* Routes d'articles avec ArticleLayout */}
                <Route path="/" element={<ArticleLayout><Home /></ArticleLayout>} />
                <Route path="/:id" element={<ArticleLayout><Home /></ArticleLayout>} />

                {/* Autres pages sans ArticleLayout */}
                <Route path="profile" element={<Profile />} />
                <Route path="proposal" element={<Proposal />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
