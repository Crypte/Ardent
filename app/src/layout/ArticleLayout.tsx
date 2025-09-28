import { useArticleRoute } from '@/hooks/useArticleRoute'
import { useAllViewedOverlay } from '@/hooks/useOverlayState'
import RandomButton from "@/components/RandomButton.tsx"
import ReadingProgress from "@/components/ReadingProgress.tsx"
import AllViewedOverlay from "@/components/AllViewedOverlay.tsx"

interface ArticleLayoutProps {
    children: React.ReactNode
}

/**
 * Layout principal pour les pages d'articles
 * Gère la navigation, les overlays et les contrôles globaux
 */
export default function ArticleLayout({ children }: ArticleLayoutProps) {
    const { isAllViewed, navigateToRandomArticle } = useArticleRoute()
    const allViewedOverlay = useAllViewedOverlay(isAllViewed)

    return (
        <div>
            <AllViewedOverlay
                isVisible={allViewedOverlay.isVisible}
                onReviewOld={allViewedOverlay.hide}
                onClose={allViewedOverlay.hide}
            />
            <ReadingProgress />
            {children}
            <RandomButton
                onNavigateToRandom={navigateToRandomArticle}
                isAllViewed={isAllViewed}
            />
        </div>
    )
}