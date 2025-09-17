import type { RecordModel } from 'pocketbase'

export interface ViewRecord extends RecordModel {
    ressource: string;
    user: string;
    viewed_at: string;
}

export interface UserAuthRecord {
    id: string;
    email: string;
    username?: string;
    name?: string;
    avatar?: string;
    verified?: boolean;
    created?: string;
    updated?: string;
}