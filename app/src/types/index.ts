// ==========================================
// TYPES CENTRALISÉS - ARCHITECTURE CLEAN
// ==========================================

// ================== UTILISATEUR ==================
export interface User {
    id: string
    email: string
    name: string
    verified: boolean
    avatar?: string | null
    is_premium: boolean
    accessible_resources_count: number
    viewed_resources_count: number
}

// ================== ARTICLES/RESSOURCES ==================
export interface Article {
    id: string
    title: string
    content: string
    published: boolean
    is_public: boolean
    source?: string[]
    created: string
    updated: string
    theme_name: string
    view_count: number
    unique_viewers: number
    cards: ArticleCard[]
    // Données de vue utilisateur
    is_viewed: boolean
    viewed_at?: string | null
    access_type?: "premium" | "public"
    user_type?: "premium" | "free"
}

export interface ArticleCard {
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

// ================== API RESPONSES ==================
export interface ArticleSelectionResponse {
    articleId: string | null
    totalArticles: number
    totalAccessible: number
    isAllViewed: boolean
    totalUnseenInDatabase: number
    userType: "premium" | "free"
    articleTitle?: string
    isPublic?: boolean
    message?: string
}

export interface ApiError {
    error: string
    code?: string
    details?: string
}