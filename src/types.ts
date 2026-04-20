export interface Todo {
    id: number
    userID: number
    title: string
    description: string | null
    completed: boolean
    priority: 'low' | 'medium' | 'high'
    created: string
    updated: string
}

export interface LoginResponse {
    API_KEY: string
}