'use client'

import { Locale } from '@/entities/i18n/routing'
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'
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
            <HeroUIProvider>
                <ThemeProvider defaultTheme="dark" attribute="class" disableTransitionOnChange>
                    <ToastProvider />
                    {children}
                </ThemeProvider>
            </HeroUIProvider>
        </NextIntlClientProvider>
    )
}
