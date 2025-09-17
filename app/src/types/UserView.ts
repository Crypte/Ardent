export interface UserView {
    id: string
    user_id: string
    email: string
    name: string
    verified: boolean
    avatar?: string | null
    accessible_resources_count: number
    viewed_resources_count: number
}