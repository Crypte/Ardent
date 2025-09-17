import { RessourceSkeleton } from "@/components/ressource/RessourceSkeleton"
import RessourceView from "@/components/ressource/RessourceView"
import type {Ressource} from "@/types/Ressource"

type Props = {
    ressource: Ressource | null
    loading: boolean
    error: string | null
}

export default function RessourcesFeed({ ressource, loading, error }: Props) {
    if (loading) return <RessourceSkeleton />
    if (error) return <p className="text-red-600 text-center py-4">{error}</p>
    if (!ressource) return <p className="text-center py-4">Aucune ressource disponible</p>

    return <RessourceView ressource={ressource} />
}