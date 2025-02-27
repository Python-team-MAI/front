import createMiddleware from 'next-intl/middleware'
import { routing } from './entities/i18n/routing'
import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './shared/constants/tokens'
import { $fetch } from '@/fetch'

export default async function middleWare(request: NextRequest) {
    const accessToken = request.cookies.get(ACCESS_TOKEN)
    const pathname = request.nextUrl.pathname
    let locale
    console.log('token', accessToken)

    switch (pathname.slice(0, 4)) {
        case '/ru':
            locale = 'ru'
            break
        case '/en':
            locale = 'en'
            break
        case '/ch':
            locale = 'ch'
            break
        case '/ru/':
            locale = 'ru'
            break
        case '/en/':
            locale = 'en'
            break
        case '/ch/':
            locale = 'ch'
            break
        default:
            locale = 'ru'
            break
    }

    if (
        process.env.NODE_ENV === 'production' &&
        !accessToken &&
        request.nextUrl.pathname !== `/${locale}/login` &&
        request.nextUrl.pathname !== `/${locale}/register`
    ) {
        const refreshToken = request.cookies.get(REFRESH_TOKEN)
        if (refreshToken) {
            try {
                await $fetch('/auth/refresh', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${refreshToken}` },
                })
                // return NextResponse.redirect(new URL(`/${locale || 'en'}`, request.url))
            } catch (e) {
                console.log(e)
                return NextResponse.redirect(new URL(`/${locale || 'en'}/login`, request.url))
            }
        } else {
            return NextResponse.redirect(new URL(`/${locale || 'en'}/login`, request.url))
        }
    }

    if (
        accessToken &&
        (request.nextUrl.pathname === `/${locale}/login` || request.nextUrl.pathname === `/${locale}/register`)
    ) {
        return NextResponse.redirect(new URL(`/${locale || 'en'}`, request.url))
    }

    return createMiddleware(routing)(request)
}

export const config = {
    matcher: ['/(ru|en|ch)/:path*'],
}
