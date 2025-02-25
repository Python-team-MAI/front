'use client'
import { Button } from "@heroui/button"
import { usePathname, useRouter } from '@/entities/i18n/routing'
import React from 'react'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export const LanguageSwitcher = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const locale = useLocale()

    const handleLocaleChange = () => {
        router.push(pathname + '?' + searchParams.toString(), {
            locale: locale === 'en' ? 'ru' : locale === 'ru' ? 'ch' : 'en',
        })
    }

    return (
        <Button size="sm" onPress={handleLocaleChange}>
            {locale === 'ru' ? 'РУ' : locale === 'en' ? 'EN' : '中文'}
        </Button>
    )
}
