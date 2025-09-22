import { useState } from "react"
import { toast } from "sonner"
import { pb } from "@/pocketbase/pocketbase"
import {useAuth} from "@/contexts/AuthContext.tsx";

interface ProposalData {
    title: string
    description: string
    source: string[] | null
    user_id: string
}

export function useProposal() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {user} = useAuth()

    const submitProposal = async (data: ProposalData) => {
        if (!pb.authStore.isValid) {
            toast.error("Vous devez être connecté pour proposer un sujet")
            return false
        }

        setIsSubmitting(true)
        try {
            await pb.collection("proposal").create({
                title: data.title.trim(),
                description: data.description.trim(),
                source: data.source,
                user_id: user?.id
            })

            toast.success("Proposition envoyée avec succès", {
                description: "Merci de nous aider à améliorer Ardent ",
            })
            return true
        } catch {
            toast.error("Erreur lors de la soumission de la proposition")
            return false
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        submitProposal,
        isSubmitting
    }
}