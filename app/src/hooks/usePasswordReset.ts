import { useState } from "react"
import { toast } from "sonner"
import { pb } from "@/pocketbase/pocketbase"
import { useAuth } from "@/contexts/AuthContext"

export function usePasswordReset(email: string) {
    const { logout } = useAuth()
    const [isSendingReset, setIsSendingReset] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handlePasswordReset = async () => {
        setIsSendingReset(true)
        try {
            await pb.collection("users").requestPasswordReset(email)
            toast.success("Email envoyé", {
                description: "Un email de réinitialisation a été envoyé à votre adresse.",
            })
            logout()
        } catch {
            toast.error("Erreur", {
                description: "Impossible d'envoyer l'email de réinitialisation. Veuillez réessayer.",
            })
        } finally {
            setIsSendingReset(false)
        }
    }

    return {
        isSendingReset,
        showConfirm,
        setShowConfirm,
        handlePasswordReset,
    }
}