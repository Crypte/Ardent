import { RessourceSkeleton } from "@/components/ressource/RessourceSkeleton"
import RessourceView from "@/components/ressource/RessourceView"
import { EmptyResourceCard } from "@/components/EmptyResourceCard"
import { useCurrentResource } from "@/contexts/CurrentResourceContext"

export default function Home() {
    const { ressource, loading, error, isRedirecting, isViewed, viewsLoading } = useCurrentResource()

    // Si en cours de redirection vers un ID aléatoire
    if (isRedirecting) return <RessourceSkeleton />
    
    // Si ressource en cours de chargement ou vues en cours de chargement
    if (loading || viewsLoading) return <RessourceSkeleton />
    
    // Si pas de ressource ou erreur
    if (error || !ressource) return <EmptyResourceCard />
    
    // Si isViewed n'est pas encore déterminé, attendre
    if (isViewed === null) return <RessourceSkeleton />

    return <RessourceView ressource={ressource} />
}
