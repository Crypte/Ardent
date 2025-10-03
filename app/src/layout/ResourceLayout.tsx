import { useResourceRoute } from '@/hooks/useResourceRoute'
import { useAllViewedOverlay } from '@/hooks/useOverlayState'
import RandomButton from "@/components/RandomButton.tsx"
import ReadingProgress from "@/components/ReadingProgress.tsx"
import AllViewedOverlay from "@/components/AllViewedOverlay.tsx"

interface ResourceLayoutProps {
    children: React.ReactNode
}

/**
 * Layout principal pour les pages de resources
 * Gère la navigation, les overlays et les contrôles globaux
 */
export default function ResourceLayout({ children }: ResourceLayoutProps) {
    const { isAllViewed, navigateToRandomResource } = useResourceRoute()
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
                onNavigateToRandom={navigateToRandomResource}
                isAllViewed={isAllViewed}
            />
        </div>
    )
}