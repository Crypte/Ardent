import { useState, useCallback } from "react"
import { pb } from "@/pocketbase/pocketbase"
import type { ArticleSelectionResponse, ApiError } from "@/types"

export function useArticleSelection() {
    const [data, setData] = useState<ArticleSelectionResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)

    const selectArticle = useCallback(async (mode: "exclude_viewed" | "random" = "exclude_viewed") => {
        setLoading(true)
        setError(null)

        try {
            const articleData: ArticleSelectionResponse = await pb.send("/api/select-article", {
                query: { mode }
            })

            setData(articleData)
            return articleData

        } catch (err: any) {
            console.error("Erreur lors de la sélection d'article:", err)
            const errorMessage = err.message || "Erreur lors de la sélection d'article"
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
        selectArticle,
        reset,
    }
}