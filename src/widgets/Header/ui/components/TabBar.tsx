'use client'

import { Tab, Tabs } from "@heroui/tabs"
import { usePathname } from '@/entities/i18n/routing'
import React from 'react'
import { useLocale } from 'next-intl'
import moment from 'moment'

export const TabBar = () => {
    const pathname = usePathname()
    const locale = useLocale()

    return (
        <nav className="mx-2 sm:hidden">
            <Tabs fullWidth selectedKey={`/${locale}${pathname}`}>
                <Tab key={`/${locale}/`} href={`/${locale}/`} title={'Главная'} />
                <Tab
                    key={`/${locale}/schedule`}
                    href={`/${locale}/schedule?date=${moment().format('DD.MM.YYYY')}&group=М8О-101БВ-24`}
                    title="Расписание"
                />
                <Tab key={`/${locale}/deadlines`} href={`/${locale}/deadlines`} title="Дедлайны" />
            </Tabs>
        </nav>
    )
}
