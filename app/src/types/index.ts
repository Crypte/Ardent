// ================== UTILISATEUR ==================
export interface User {
    id: string
    email: string
    name: string
    verified: boolean
    avatar?: string | null
    is_premium: boolean
    stripe_customer_id?: string | null
    premium_since?: string | null
    accessible_resources_count: number
    viewed_resources_count: number
}

// ================== RESOURCES ==================
export interface Resource {
    id: string
    title: string
    content: string
    published: boolean
    is_public: boolean
    created: string
    updated: string
    theme_name: string
    view_count: number
    unique_viewers: number
    cards: ResourceCard[]
    // Données de vue utilisateur
    is_viewed: boolean
    viewed_at?: string | null
    access_type?: "premium" | "public"
    user_type?: "premium" | "free"
}

export interface ResourceCard {
    id: string
    type: 'vocabulaire' | 'event' | 'anecdote' | 'keynumber'
    title: string
    content: string
    metadata: {
        place?: string
        date?: string
        number?: string
        word?: string
        definition?: string
        genre?: 'masculin' | 'féminin'
    } | null
}
