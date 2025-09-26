export interface Theme {
    id: string
    name: string
}

// Type pour ressource_view avec cards array et métriques
export type Ressource = {
    // Attributs de base
    id: string
    title: string
    published: boolean
    content: string
    source?: string[]
    created: string
    updated: string

    // Informations du thème (directement en string)
    theme_name: string

    // Métriques ajoutées dans ressource_view
    view_count: number
    unique_viewers: number

    // Cards consolidées dans un array
    cards: RessourceCard[]

    // Infos de vue utilisateur (optionnelles pour rétrocompatibilité)
    is_viewed?: boolean
    viewed_at?: string | null
}

export interface RessourceCard {
    id: string
    type: 'vocabulaire' | 'event' | 'anecdote' | 'keynumber'
    title: string
    content: string
    metadata: {
        // Pour type 'event'
        place?: string
        date?: string

        // Pour type 'keynumber'
        number?: string

        // Pour type 'vocabulaire'
        word?: string
        definition?: string
        genre?: 'masculin' | 'féminin'
    } | null
}


