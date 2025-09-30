import { useState, useCallback } from "react"
import { pb } from "@/pocketbase/pocketbase"
import type { ArticleSelectionResponse, ApiError } from "@/types/API.ts"

interface UseArticleNavigationReturn {
    data: ArticleSelectionResponse | null
    loading: boolean
    error: ApiError | null
    navigateToNext: (currentArticleId?: string) => Promise<string | null>
    reset: () => void
}

/**
 * Hook spécialisé pour la navigation entre articles
 * Gère la sélection d'articles avec exclusion et marquage comme vu
 */
export function useArticleNavigation(): UseArticleNavigationReturn {
    const [data, setData] = useState<ArticleSelectionResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)

    const navigateToNext = useCallback(async (currentArticleId?: string): Promise<string | null> => {
        setLoading(true)
        setError(null)

        try {
            // Construire l'endpoint selon la présence d'un article courant
            const endpoint = currentArticleId
                ? `/api/select-article/${currentArticleId}`
                : "/api/select-article/"

            const articleData: ArticleSelectionResponse = await pb.send(endpoint, {
                method: "GET"
            })

            setData(articleData)
            return articleData.articleId

        } catch (err: unknown) {
            console.error("Erreur lors de la navigation vers l'article suivant:", err)
            const errorMessage = err instanceof Error ? err.message : "Erreur lors de la sélection d'article"
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