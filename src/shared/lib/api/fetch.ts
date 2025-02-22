import { ACCESS_TOKEN } from '@/shared/constants/tokens'

export const $fetch = (input: string | URL | globalThis.Request, init?: RequestInit) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${input}`, {
        headers: {
            Authorization: localStorage.getItem(ACCESS_TOKEN) ? (localStorage.getItem(ACCESS_TOKEN) as string) : '',
            'Content-Type': 'application/json',
            ...init?.headers,
        },
        ...init,
    })
