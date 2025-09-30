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