import { useEffect, useState, useCallback, useRef } from "react"
import { pb } from "@/pocketbase/pocketbase"
import type { UserView } from "@/types/UserView"

// Types pour les erreurs
interface UserViewError {
    message: string
    code?: string
}

export function useUserStats() {
    // États
    const [userView, setUserView] = useState<UserView | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<UserViewError | null>(null)
    
    // Cache pour éviter les requêtes répétées
    const lastFetchTime = useRef<number>(0)
    const CACHE_DURATION = 30000 // 30 secondes

    // Fonction utilitaire pour récupérer les données utilisateur
    const fetchUserView = useCallback(async (forceRefresh = false) => {
        if (!pb.authStore.isValid) {
            setUserView(null)
            setLoading(false)
            return
        }

        if (!pb.authStore.model?.id) {
            setError({ message: "ID utilisateur non disponible", code: "NO_USER_ID" })
            setLoading(false)
            return
        }

        // Vérifier le cache sauf si refresh forcé
        const now = Date.now()
        if (!forceRefresh && now - lastFetchTime.current < CACHE_DURATION) {
            return
        }

        setLoading(true)
        setError(null)

        try {
            const userViewData = await pb.collection("user_view").getOne<UserView>(pb.authStore.model.id)
            setUserView(userViewData)
            lastFetchTime.current = now
        } catch (err: any) {
            console.error("Erreur lors de la récupération des données utilisateur:", err)
            const errorMessage = err?.response?.message || "Impossible de récupérer les données utilisateur"
            setError({ message: errorMessage, code: err?.status || "FETCH_ERROR" })
            setUserView(null)
        } finally {
            setLoading(false)
        }
    }, [])

    // Hook d'initialisation
    useEffect(() => {
        fetchUserView()

        // S'abonner aux changements d'authentification
        const unsubscribe = pb.authStore.onChange(() => {
            lastFetchTime.current = 0 // Reset cache
            fetchUserView()
        })

        return unsubscribe
    }, [fetchUserView])

    // Fonction pour rafraîchir les données (avec reset du cache)
    const refetch = useCallback(async () => {
        lastFetchTime.current = 0 // Reset cache
        await fetchUserView(true)
    }, [fetchUserView])

    return {
        // Données
        userView,
        loading,
        error,
        
        // Actions
        refetch,
        
        // Helpers computed
        isVerified: userView?.verified === true,
        hasData: userView !== null,
        accessibleResourcesCount: userView?.accessible_resources_count || 0,
        viewedResourcesCount: userView?.viewed_resources_count || 0
    }
}