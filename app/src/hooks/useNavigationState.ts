import { useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRandomRessourceId } from '@/hooks/useRandomRessourceId'

// Constantes
export const NavigationError = {
    NO_UNVIEWED_RESOURCES: "NO_UNVIEWED_RESOURCES",
    GENERAL_ERROR: "GENERAL_ERROR"
} as const

export function useNavigationState() {
    // États
    const [excludeViewed, setExcludeViewed] = useState(false)
    const [allViewed, setAllViewed] = useState(false)

    // Hooks externes
    const { refetch } = useRandomRessourceId()
    const navigate = useNavigate()
    const { id: currentId } = useParams<{ id?: string }>()

    // Navigation vers ressource aléatoire
    const navigateToRandomResource = useCallback(async () => {
        try {
            const newId = await refetch(currentId, excludeViewed)
            navigate(`/${newId}`)
            setAllViewed(false)
        } catch (error) {
            if (error instanceof Error && error.message === "NO_UNVIEWED_RESOURCES") {
                setAllViewed(true)
            } else {
                console.error("Erreur de navigation:", error)
            }
        }
    }, [refetch, currentId, excludeViewed, navigate])

    // Gérer le changement d'exclusion des vues
    const handleExcludeViewedChange = useCallback(async (exclude: boolean, isViewedFn: (id: string) => boolean) => {
        setExcludeViewed(exclude)
        setAllViewed(false)
        
        if (exclude) {
            // Vérifier s'il y a des ressources non vues disponibles
            try {
                const newId = await refetch(currentId, true)
                // S'il y a des ressources non vues et qu'on est sur une ressource déjà vue, naviguer
                if (currentId && isViewedFn(currentId)) {
                    navigate(`/${newId}`)
                }
            } catch (error) {
                if (error instanceof Error && error.message === "NO_UNVIEWED_RESOURCES") {
                    setAllViewed(true)
                } else {
                    console.error("Erreur de navigation:", error)
                }
            }
        }
    }, [currentId, refetch, navigate])

    // Réinitialiser vers toutes les ressources
    const resetToAllResources = useCallback(() => {
        setExcludeViewed(false)
        setAllViewed(false)
    }, [])

    return {
        // États
        excludeViewed,
        allViewed,
        currentId,

        // Fonctions de navigation
        navigateToRandomResource,
        handleExcludeViewedChange,
        resetToAllResources,

        // Setters pour les états (pour usage externe)
        setExcludeViewed,
        setAllViewed
    }
}