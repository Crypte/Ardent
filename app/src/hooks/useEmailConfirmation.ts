import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pb } from "@/pocketbase/pocketbase"
import { toast } from "sonner"

interface EmailConfirmationState {
    loading: boolean
    error: string | null
    success: boolean
}

export function useEmailConfirmation(token: string | null) {
    const navigate = useNavigate()
    const [state, setState] = useState<EmailConfirmationState>({
        loading: true,
        error: null,
        success: false
    })

    useEffect(() => {
        const confirmEmail = async () => {
            if (!token) {
                toast.error("Erreur", {
                    description: "Token manquant.",
                })
                setState({
                    loading: false,
                    error: "Token manquant",
                    success: false
                })
                return
            }

            try {
                await pb.collection("users").confirmVerification(token)
                
                setState({
                    loading: false,
                    error: null,
                    success: true
                })
                
                toast.success("Email confirmé", {
                    description: "Votre email a été confirmé avec succès!",
                })

                // Redirection automatique après 3 secondes
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            } catch (error) {
                const errorMessage = "Le lien de confirmation est invalide ou expiré."
                
                setState({
                    loading: false,
                    error: errorMessage,
                    success: false
                })
                
                toast.error("Erreur", {
                    description: errorMessage,
                })
            }
        }

        confirmEmail()
    }, [token, navigate])

    const goToLogin = () => {
        navigate("/login")
    }

    return {
        ...state,
        goToLogin
    }
}