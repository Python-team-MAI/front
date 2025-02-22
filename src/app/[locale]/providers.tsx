'use client'

import { Locale } from '@/entities/i18n/routing'
import { NextUIProvider } from '@nextui-org/react'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

export function Providers({
    children,
    messages,
    locale,
}: {
    children: React.ReactNode
    messages: AbstractIntlMessages
    locale: Locale
}) {
    return (
        <NextIntlClientProvider timeZone="Europe/Moscow" locale={locale} messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <NextUIProvider>{children}</NextUIProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    )
}
