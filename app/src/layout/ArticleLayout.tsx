import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useArticleSelection } from '@/hooks/useArticleSelection.ts'
import RandomButton from "@/components/RandomButton.tsx"
import ReadingProgress from "@/components/ReadingProgress.tsx"
import AllViewedOverlay from "@/components/AllViewedOverlay.tsx"

interface ArticleLayoutProps {
    children: React.ReactNode
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {
    const { id } = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const { selectArticle, data, reset } = useArticleSelection()
    const [excludeViewed, setExcludeViewed] = useState(() => {
        const saved = localStorage.getItem('excludeViewed')
        return saved !== null ? JSON.parse(saved) : true
    })

    // Sauvegarder le mode dans localStorage
    useEffect(() => {
        localStorage.setItem('excludeViewed', JSON.stringify(excludeViewed))
    }, [excludeViewed])

    // Redirection vers un ID aléatoire si pas d'ID dans l'URL
    useEffect(() => {
        if (!id) {
            reset()
            const mode = excludeViewed ? "exclude_viewed" : "random"
            selectArticle(mode).then(result => {
                if (result?.articleId) {
                    navigate(`/${result.articleId}`, { replace: true })
                }
            })
        }
    }, [id, selectArticle, excludeViewed, reset, navigate])

    // Actions pour RandomButton
    const handleNavigateToRandomResource = async () => {
        const mode = excludeViewed ? "exclude_viewed" : "random"
        const result = await selectArticle(mode)

        if (result?.articleId) {
            navigate(`/${result.articleId}`)
        }
    }

    const handleExcludeViewedChange = (pressed: boolean) => {
        setExcludeViewed(pressed)
    }

    const handleResetToAllResources = async () => {
        setExcludeViewed(false) // Switch vers mode random
        const result = await selectArticle("random")
        if (result?.articleId) {
            navigate(`/${result.articleId}`)
        }
    }

    return (
        <>
            <AllViewedOverlay
                isVisible={(data?.isAllViewed || false) && excludeViewed}
                onReviewOld={handleResetToAllResources}
                onClose={handleResetToAllResources}
            />
            <ReadingProgress />
            {children}
            <RandomButton
                excludeViewed={excludeViewed}
                onExcludeViewedChange={handleExcludeViewedChange}
                onNavigateToRandom={handleNavigateToRandomResource}
            />
        </>
    )
}