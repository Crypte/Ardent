import { useState } from "react"
import { toast } from "sonner"
import { pb } from "@/pocketbase/pocketbase"

export function useDeleteAccount(id: string, onAccountDeleted: () => void) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    const handleAccountDelete = async () => {
        const confirmed = deleteConfirm.trim().toLowerCase() === "Supprimer mon compte"
        if (!confirmed) return

        setIsDeleting(true)

        try {
            await pb.collection("users").delete(id)
            toast.success("Compte supprimé", {
                description: "Votre compte a été supprimé avec succès.",
            })
            setShowConfirm(false)
            onAccountDeleted()
        } catch (err) {
            console.error("Erreur lors de la suppression du compte :", err)
            toast.error("Erreur", {
                description: "Impossible de supprimer votre compte. Veuillez réessayer.",
            })
        } finally {
            setIsDeleting(false)
        }
    }

    return {
        showConfirm,
        setShowConfirm,
        deleteConfirm,
        setDeleteConfirm,
        isDeleting,
        handleAccountDelete
    }
}