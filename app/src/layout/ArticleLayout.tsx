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
    const [overlayVisible, setOverlayVisible] = useState(false)

    // Redirection vers un ID aléatoire si pas d'ID dans l'URL
    useEffect(() => {
        if (!id) {
            reset()
            selectArticle().then(result => {
                if (result?.articleId) {
                    navigate(`/${result.articleId}`, { replace: true })
                }
            })
        }
    }, [id, selectArticle, reset, navigate])

    // Récupérer les infos de statut même avec un ID
    useEffect(() => {
        if (id && !data) {
            selectArticle()
        }
    }, [id, data, selectArticle])

    // Gestion de l'overlay
    useEffect(() => {
        if (data?.isAllViewed) {
            setOverlayVisible(true)
        }
    }, [data?.isAllViewed])

    const handleCloseOverlay = () => {
        setOverlayVisible(false)
    }

    // Actions pour RandomButton
    const handleNavigateToRandomResource = async () => {
        const result = await selectArticle()

        if (result?.articleId) {
            navigate(`/${result.articleId}`)
        }
    }

    return (
        <>
            <AllViewedOverlay
                isVisible={overlayVisible}
                onReviewOld={handleCloseOverlay}
                onClose={handleCloseOverlay}
            />
            <ReadingProgress />
            {children}
            <RandomButton
                onNavigateToRandom={handleNavigateToRandomResource}
                isAllViewed={data?.isAllViewed}
            />
        </>
    )
}