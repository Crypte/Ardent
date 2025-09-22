import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RessourceSkeleton } from "@/components/ressource/RessourceSkeleton"
import RessourceView from "@/components/ressource/RessourceView"
import { EmptyResourceCard } from "@/components/EmptyResourceCard"
import { useRessourceById } from '@/hooks/useRessourceById'
import { useRandomRessourceId } from '@/hooks/useRandomRessourceId'
import RandomButton from "@/components/RandomButton.tsx"
import ReadingProgress from "@/components/ReadingProgress.tsx"

export default function Home() {
    const { id } = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const { id: randomId } = useRandomRessourceId()

    // Utiliser le hook qui récupère la ressource
    const { ressource, loading, error } = useRessourceById(id || null)

    // Redirection vers un ID aléatoire si pas d'ID dans l'URL
    useEffect(() => {
        if (!id && randomId) {
            navigate(`/${randomId}`, { replace: true })
        }
    }, [id, randomId, navigate])

    // isViewed vient directement de la ressource
    const isViewed = ressource?.is_viewed ?? false
    const isRedirecting = !id && !randomId

    // Si en cours de redirection vers un ID aléatoire
    if (isRedirecting || loading) {
        return <RessourceSkeleton />
    }

    // Si pas de ressource ou erreur
    if (error || !ressource) return <EmptyResourceCard />

    return (
        <>
            <ReadingProgress />
            <RessourceView ressource={ressource} isViewed={isViewed} />
            <RandomButton />
        </>
    )
}
