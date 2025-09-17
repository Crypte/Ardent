import { useEffect, useState } from "react"
import { pb } from "@/pocketbase/pocketbase"
import type { Ressource } from "@/types/Ressource"

export function useRessourceById(id: string | null) {
    const [ressource, setRessource] = useState<Ressource | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRessourceWithView = async () => {
            if (!id) {
                setError("ID invalide")
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)

            try {
                // Appeler notre route personnalisée
                const response = await pb.send(`/api/ressource-with-view/${id}`, {
                    method: 'GET'
                })
                
                setRessource(response as Ressource)
            } catch (err) {
                console.error("Erreur récupération ressource avec vue:", err)
                setError("Impossible de récupérer la ressource.")
            } finally {
                setLoading(false)
            }
        }

        fetchRessourceWithView()
    }, [id])

    return {
        ressource,
        loading,
        error,
    }
}