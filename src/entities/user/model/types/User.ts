export interface User {
    first_name?: string
    last_name?: string
    bio?: string
    email: string
    auth_type: 'default' | 'yandex' | 'google' | 'github'
    course?: number
    group_id?: string
    institute?: string
    role: string
    id: number
}
