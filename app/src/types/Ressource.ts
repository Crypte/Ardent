export interface Theme {
    id: string
    name: string
}

export interface Event {
    id: string
    title: string
    content:string
    place:string
    date:string
}

export interface Anecdote {
    id: string
    title: string
    content:string
}

export interface Keynumber {
    id: string
    number:string
    content:string
}

export interface Vocabulaire {
    id: string
    word: string
    definition:string
    masculin:boolean
    usage:string[]
}

// Type pour ressource_view avec relations JSON et métriques
export type Ressource = {
    // Attributs de base
    id: string
    resource_id: string
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
    
    // Relations en JSON (peuvent être null)
    event?: Event | null
    vocabulaire?: Vocabulaire | null
    anecdote?: Anecdote | null
    keynumber?: Keynumber | null
    
    // Infos de vue utilisateur (optionnelles pour rétrocompatibilité)
    is_viewed?: boolean
    viewed_at?: string | null
}

