import { useEffect, useState } from "react"
import { pb } from "@/pocketbase/pocketbase"
import type { Resource } from "@/types"

export function useResourceById(id: string | null) {
    const [resource, setResource] = useState<Resource | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchResourceWithView = async () => {
            if (!id) {
                setError("ID invalide")
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)

            try {
                // Utiliser la nouvelle API get-resource
                const response = await pb.send(`/api/get-resource/${id}`, {
                    method: 'GET'
                })

                setResource(response as Resource)
            } catch (err) {
                console.error("Erreur récupération resource avec vue:", err)
                setError("Impossible de récupérer la resource.")
            } finally {
                setLoading(false)
            }
        }

        fetchResourceWithView()
    }, [id])

    return {
        resource,
        loading,
        error,
    }
}