import { useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useResourceNavigation } from "./useResourceNavigation"

interface UseResourceRouteReturn {
    currentResourceId: string | null
    navigationData: ReturnType<typeof useResourceNavigation>["data"]
    isNavigationLoading: boolean
    navigationError: ReturnType<typeof useResourceNavigation>["error"]
    navigateToRandomResource: () => Promise<void>
    isAllViewed: boolean
}

/**
 * Hook centralisé pour gérer la navigation et l'état des routes de resources
 * Combine la logique de routing et de navigation entre resources
 */
export function useResourceRoute(): UseResourceRouteReturn {
    const { id } = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const { data, loading, error, navigateToNext, reset } = useResourceNavigation()

    // Redirection automatique si pas d'ID dans l'URL
    useEffect(() => {
        if (!id) {
            reset()
            navigateToNext().then(nextResourceId => {
                if (nextResourceId) {
                    navigate(`/${nextResourceId}`, { replace: true })
                }
            })
        }
    }, [id, navigateToNext, reset, navigate])

    // Récupérer les stats de navigation quand on a un ID mais pas encore de data
    useEffect(() => {
        if (id && !data) {
            navigateToNext()
        }
    }, [id, data, navigateToNext])

    const navigateToRandomResource = useCallback(async () => {
        const nextResourceId = await navigateToNext(id || undefined)
        if (nextResourceId) {
            navigate(`/${nextResourceId}`)
        }
    }, [id, navigateToNext, navigate])

    return {
        currentResourceId: id || null,
        navigationData: data,
        isNavigationLoading: loading,
        navigationError: error,
        navigateToRandomResource,
        isAllViewed: data?.isAllViewed || false,
    }
}