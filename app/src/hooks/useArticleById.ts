import { useEffect, useState } from "react"
import { pb } from "@/pocketbase/pocketbase"
import type { Article } from "@/types"

export function useArticleById(id: string | null) {
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArticleWithView = async () => {
            if (!id) {
                setError("ID invalide")
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)

            try {
                // Utiliser la nouvelle API get-article
                const response = await pb.send(`/api/get-article/${id}`, {
                    method: 'GET'
                })

                setArticle(response as Article)
            } catch (err) {
                console.error("Erreur récupération article avec vue:", err)
                setError("Impossible de récupérer la article.")
            } finally {
                setLoading(false)
            }
        }

        fetchArticleWithView()
    }, [id])

    return {
        article,
        loading,
        error,
    }
}