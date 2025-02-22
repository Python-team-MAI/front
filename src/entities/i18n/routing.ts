import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export type Locale = 'ru' | 'en' | 'ch'

export const routing = defineRouting({
    locales: ['en', 'ru', 'ch'],

    defaultLocale: 'ru',
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
