import { createContext, useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRessourceById } from '@/hooks/useRessourceById'
import { useRandomRessourceId } from '@/hooks/useRandomRessourceId'
import type { Ressource } from '@/types/Ressource'

interface CurrentResourceContextType {
    ressource: Ressource | null
    loading: boolean
    error: string | null
    resourceId: string | null
    isRedirecting: boolean
    isViewed: boolean | null // null = pas encore déterminé, boolean = valeur connue
    viewsLoading: boolean
}

const CurrentResourceContext = createContext<CurrentResourceContextType | undefined>(undefined)

interface CurrentResourceProviderProps {
    children: ReactNode
}

export function CurrentResourceProvider({ children }: CurrentResourceProviderProps) {
    const { id } = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const { id: randomId } = useRandomRessourceId()
    
    // Utiliser notre nouveau hook qui récupère tout en une fois
    const { ressource, loading, error } = useRessourceById(id || null)

    // Redirection vers un ID aléatoire si pas d'ID dans l'URL
    useEffect(() => {
        if (!id && randomId) {
            navigate(`/random/${randomId}`, { replace: true })
        }
    }, [id, randomId, navigate])

    // isViewed vient directement de la ressource maintenant
    const isViewed = ressource?.is_viewed ?? null

    const value: CurrentResourceContextType = {
        ressource,
        loading,
        error,
        resourceId: id || null,
        isRedirecting: !id && !randomId, // Indique si on attend la redirection
        isViewed,
        viewsLoading: false // Plus besoin de chargement séparé
    }

    return (
        <CurrentResourceContext.Provider value={value}>
            {children}
        </CurrentResourceContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCurrentResource(): CurrentResourceContextType {
    const context = useContext(CurrentResourceContext)
    if (context === undefined) {
        throw new Error('useCurrentResource must be used within a CurrentResourceProvider')
    }
    return context
}