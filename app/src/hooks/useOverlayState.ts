import { useState, useEffect, useCallback } from "react"

interface UseOverlayStateReturn {
    isVisible: boolean
    show: () => void
    hide: () => void
    toggle: () => void
}

/**
 * Hook réutilisable pour gérer l'état d'affichage des overlays
 */
export function useOverlayState(initialState = false): UseOverlayStateReturn {
    const [isVisible, setIsVisible] = useState(initialState)

    const show = useCallback(() => setIsVisible(true), [])
    const hide = useCallback(() => setIsVisible(false), [])
    const toggle = useCallback(() => setIsVisible(prev => !prev), [])

    return {
        isVisible,
        show,
        hide,
        toggle,
    }
}

/**
 * Hook spécialisé pour l'overlay "Tous les articles vus"
 * Se déclenche automatiquement quand isAllViewed devient true
 */
export function useAllViewedOverlay(isAllViewed: boolean): UseOverlayStateReturn {
    const overlay = useOverlayState(false)

    useEffect(() => {
        if (isAllViewed) {
            overlay.show()
        }
    }, [isAllViewed, overlay.show])

    return overlay
}