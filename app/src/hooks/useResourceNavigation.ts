import { useState, useCallback } from "react"
import { pb } from "@/pocketbase/pocketbase"
import type { ResourceSelectionResponse, ApiError } from "@/types/API.ts"

interface UseResourceNavigationReturn {
    data: ResourceSelectionResponse | null
    loading: boolean
    error: ApiError | null
    navigateToNext: (currentResourceId?: string) => Promise<string | null>
    reset: () => void
}

/**
 * Hook spécialisé pour la navigation entre resources
 * Gère la sélection de resources avec exclusion et marquage comme vu
 */
export function useResourceNavigation(): UseResourceNavigationReturn {
    const [data, setData] = useState<ResourceSelectionResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)

    const navigateToNext = useCallback(async (currentResourceId?: string): Promise<string | null> => {
        setLoading(true)
        setError(null)

        try {
            // Construire l'endpoint selon la présence d'une resource courante
            const endpoint = currentResourceId
                ? `/api/select-resource/${currentResourceId}`
                : "/api/select-resource/"

            const resourceData: ResourceSelectionResponse = await pb.send(endpoint, {
                method: "GET"
            })

            setData(resourceData)
            return resourceData.resourceId

        } catch (err: unknown) {
            console.error("Erreur lors de la navigation vers la resource suivante:", err)
            const errorMessage = err instanceof Error ? err.message : "Erreur lors de la sélection de resource"
            setError({ error: errorMessage })
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    const reset = useCallback(() => {
        setData(null)
        setError(null)
        setLoading(false)
    }, [])

    return {
        data,
        loading,
        error,
        navigateToNext,
        reset,
    }
}