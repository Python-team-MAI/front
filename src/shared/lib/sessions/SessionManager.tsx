import { cookies } from 'next/headers'

export class SessionManager {
    async getSession(key?: string) {
        const cookieStore = await cookies()
        return key ? cookieStore.get(key) : cookieStore.getAll()
    }

    async deleteSessionKey(key: string) {
        const cookieStore = await cookies()
        return cookieStore.delete(key)
    }

    async setSessionKey(key: string, value: string) {
        const cookieStore = await cookies()
        return cookieStore.set(key, value)
    }
}
