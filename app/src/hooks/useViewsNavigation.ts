import { useViewTracking } from './useViewTracking'
import { useNavigationState } from './useNavigationState'

// Hook composite qui combine tous les hooks focalisés
// Refactorisé pour une meilleure séparation des responsabilités
export function useViewsNavigation() {
    const viewTracking = useViewTracking()
    const navigationState = useNavigationState()

    // Adapter handleExcludeViewedChange pour passer isViewed
    const handleExcludeViewedChange = (exclude: boolean) => {
        return navigationState.handleExcludeViewedChange(exclude, viewTracking.isViewed)
    }

    return {
        // États du tracking
        viewedIds: viewTracking.viewedIds,
        viewedResourceIds: viewTracking.viewedResourceIds,
        viewedCount: viewTracking.viewedCount,
        isLoading: viewTracking.isLoading,
        isTracking: viewTracking.isTracking,

        // États de navigation
        excludeViewed: navigationState.excludeViewed,
        allViewed: navigationState.allViewed,
        currentId: navigationState.currentId,

        // Fonctions de vérification
        isViewed: viewTracking.isViewed,
        getViewData: viewTracking.getViewData,

        // Fonctions de tracking
        trackView: viewTracking.trackView,
        resetProgress: viewTracking.resetProgress,
        refetchViews: viewTracking.refetchViews,

        // Fonctions de navigation
        navigateToRandomResource: navigationState.navigateToRandomResource,
        handleExcludeViewedChange,
        resetToAllResources: navigationState.resetToAllResources,
        
        // Système de notifications
        subscribeToReset: viewTracking.subscribeToReset
    }
}