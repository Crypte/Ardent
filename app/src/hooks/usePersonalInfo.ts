import { useEffect, useState } from "react"
import { toast } from "sonner"
import { pb } from "@/pocketbase/pocketbase"
import { useAuth } from "@/contexts/AuthContext"

export function usePersonalInfo(id: string, initialName: string) {
    const [currentName, setCurrentName] = useState(initialName)
    const [error, setError] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const { refreshUser } = useAuth()

    useEffect(() => {
        setCurrentName(initialName)
    }, [initialName])

    const validateName = () => {
        const trimmedName = currentName.trim()
        if (!trimmedName) {
            setError("Le nom ne peut pas être vide")
            return false
        }
        if (trimmedName.length < 2) {
            setError("Le nom doit contenir au moins 2 caractères")
            return false
        }
        if (trimmedName.length > 20) {
            setError("Le nom ne peut pas dépasser 20 caractères")
            return false
        }
        setError("")
        return true
    }

    const handleSave = async () => {
        setShowConfirm(false)
        setIsSaving(true)
        try {
            const trimmedName = currentName.trim()
            await pb.collection("users").update(id, { name: trimmedName })
            setCurrentName(trimmedName) // Mettre à jour avec le nom trimmé
            await refreshUser()
            toast.success("Profil mis à jour")
        } catch {
            toast.error("Impossible de mettre à jour le profil")
        } finally {
            setIsSaving(false)
        }
    }

    const resetName = () => {
        setCurrentName(initialName)
        setError("")
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copié dans le presse-papier")
    }

    return {
        currentName,
        setCurrentName,
        error,
        validateName,
        isSaving,
        showConfirm,
        setShowConfirm,
        handleSave,
        resetName,
        copyToClipboard,
    }
}