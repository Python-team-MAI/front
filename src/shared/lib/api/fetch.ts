export const $fetch = async (input: string | URL | globalThis.Request, init?: RequestInit) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${input}`, {
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers,
        },
        ...init,
    })
