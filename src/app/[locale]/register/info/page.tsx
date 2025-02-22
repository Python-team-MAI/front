import React from 'react'
import { RegisterInfoForm } from '@/features/RegisterInfoForm'
import { getTranslations } from 'next-intl/server'

// first/last_name, bio, course, group_name, institute
const InfoPage = async () => {
    const t = await getTranslations()
    // Кэш на 12 недель = 7 257 600 секунд
    const res = await fetch('https://public.mai.ru/schedule/data/groups.json', { next: { revalidate: 7257600 } })

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5 justify-center items-stretch w-1/2 max-md:w-1/2">
                <h1 className="text-2xl text-center">{t('info page')}</h1>
                <RegisterInfoForm groups={await res.json()} />
            </div>
        </main>
    )
}

export default InfoPage
