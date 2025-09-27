import { useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useArticleNavigation } from "./useArticleNavigation"

interface UseArticleRouteReturn {
    currentArticleId: string | null
    navigationData: ReturnType<typeof useArticleNavigation>["data"]
    isNavigationLoading: boolean
    navigationError: ReturnType<typeof useArticleNavigation>["error"]
    navigateToRandomArticle: () => Promise<void>
    isAllViewed: boolean
}

/**
 * Hook centralisé pour gérer la navigation et l'état des routes d'articles
 * Combine la logique de routing et de navigation entre articles
 */
export function useArticleRoute(): UseArticleRouteReturn {
    const { id } = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const { data, loading, error, navigateToNext, reset } = useArticleNavigation()

    // Redirection automatique si pas d'ID dans l'URL
    useEffect(() => {
        if (!id) {
            reset()
            navigateToNext().then(nextArticleId => {
                if (nextArticleId) {
                    navigate(`/${nextArticleId}`, { replace: true })
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

    const navigateToRandomArticle = useCallback(async () => {
        const nextArticleId = await navigateToNext(id || undefined)
        if (nextArticleId) {
            navigate(`/${nextArticleId}`)
        }
    }, [id, navigateToNext, navigate])

    return {
        currentArticleId: id || null,
        navigationData: data,
        isNavigationLoading: loading,
        navigationError: error,
        navigateToRandomArticle,
        isAllViewed: data?.isAllViewed || false,
    }
}