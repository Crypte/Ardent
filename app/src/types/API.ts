export interface ResourceSelectionResponse {
    resourceId: string | null
    totalResources: number
    totalAccessible: number
    isAllViewed: boolean
    totalUnseenInDatabase: number
    userType: "premium" | "free"
    resourceTitle?: string
    isPublic?: boolean
    message?: string
}

export interface ApiError {
    error: string
    code?: string
    details?: string
}