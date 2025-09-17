import { useState, useEffect, useCallback, useRef } from 'react'
import { pb } from '@/pocketbase/pocketbase'
import type { ViewRecord } from '@/types/ViewRecord'

// Types
interface ViewData {
    id: string
    viewed_at: string
}

// Type des callbacks pour notifications
type ResetCallback = () => void | Promise<void>

export function useViewTracking() {
    // États
    const [viewedIds, setViewedIds] = useState<Set<string>>(new Set())
    const [isLoading, setIsLoading] = useState(true)
    const [isTracking, setIsTracking] = useState(false)
    
    // Callbacks pour notifier les autres hooks d'un reset
    const resetCallbacks = useRef<Set<ResetCallback>>(new Set())

    // Fonction utilitaire pour charger les ressources vues
    const fetchViewedResources = useCallback(async () => {
        if (!pb.authStore.isValid) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            const views = await pb.collection('user_views').getFullList<ViewRecord>({
                filter: `user="${pb.authStore.model?.id}"`,
                fields: 'ressource'
            })

            const viewed = new Set<string>()
            views.forEach(view => {
                viewed.add(view.ressource)
            })

            setViewedIds(viewed)
        } catch (error) {
            console.error('Erreur lors du chargement des ressources vues:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Charger toutes les ressources vues au démarrage
    useEffect(() => {
        fetchViewedResources()
    }, [fetchViewedResources])

    // Vérifier si une ressource est vue
    const isViewed = useCallback((ressourceId: string): boolean => {
        return viewedIds.has(ressourceId)
    }, [viewedIds])

    // Obtenir les détails d'une vue spécifique
    const getViewData = useCallback(async (ressourceId: string): Promise<ViewData | null> => {
        if (!pb.authStore.isValid || !ressourceId) return null

        try {
            const view = await pb.collection('user_views')
                .getFirstListItem(`user="${pb.authStore.model?.id}" && ressource="${ressourceId}"`)
            
            return {
                id: view.id,
                viewed_at: view.viewed_at
            }
        } catch (error) {
            return null
        }
    }, [])

    // Marquer une ressource comme vue (sans mettre à jour l'affichage immédiatement)
    const trackView = useCallback(async (ressourceId: string) => {
        if (!pb.authStore.isValid || !ressourceId) return

        setIsTracking(true)

        try {
            const existingView = await pb.collection('user_views')
                .getFirstListItem(`user="${pb.authStore.model?.id}" && ressource="${ressourceId}"`)
                .catch(() => null)

            if (existingView) {
                await pb.collection('user_views').update(existingView.id, {
                    viewed_at: new Date().toISOString()
                })
            } else {
                await pb.collection('user_views').create({
                    user: pb.authStore.model?.id,
                    ressource: ressourceId,
                    viewed_at: new Date().toISOString()
                })

                // NE PAS mettre à jour l'état local pour que le badge n'apparaisse pas immédiatement
                // L'état sera mis à jour au prochain rechargement de la page/composant
            }
        } catch (error) {
            console.error('Erreur lors du tracking de la vue:', error)
        } finally {
            setIsTracking(false)
        }
    }, [])

    // Réinitialiser toutes les vues avec notification des autres hooks
    const resetProgress = useCallback(async () => {
        if (!pb.authStore.isValid) return

        try {
            const views = await pb.collection('user_views').getFullList({
                filter: `user="${pb.authStore.model?.id}"`
            })

            // Supprimer toutes les vues
            await Promise.all(
                views.map(view => pb.collection('user_views').delete(view.id))
            )

            // Mettre à jour l'état local
            setViewedIds(new Set())
            
            // Notifier tous les hooks enregistrés (comme useUserStats)
            for (const callback of resetCallbacks.current) {
                try {
                    await callback()
                } catch (error) {
                    console.error('Erreur lors de la notification de reset:', error)
                }
            }
        } catch (error) {
            console.error('Erreur lors de la réinitialisation:', error)
            throw error
        }
    }, [])

    // Fonction pour s'abonner aux resets (utilisée par useUserStats)
    const subscribeToReset = useCallback((callback: ResetCallback) => {
        resetCallbacks.current.add(callback)
        
        // Retourner une fonction de désabonnement
        return () => {
            resetCallbacks.current.delete(callback)
        }
    }, [])

    return {
        // États
        viewedIds,
        viewedResourceIds: Array.from(viewedIds),
        viewedCount: viewedIds.size,
        isLoading,
        isTracking,

        // Fonctions de vérification
        isViewed,
        getViewData,

        // Fonctions de tracking
        trackView,
        resetProgress,
        refetchViews: fetchViewedResources,
        
        // Système de notifications
        subscribeToReset
    }
}