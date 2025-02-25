'use client'

import { getWeekRange } from '@/shared/lib/dates/getWeekRange'
import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/drawer"
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/entities/i18n/routing'
import { FC, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface WeekDrawer {
    start: string
    end: string
    times: string[]
}

export const WeekDrawer: FC<WeekDrawer> = ({ end, start, times }) => {
    const searchParams = useSearchParams()
    const currentDate = searchParams.get('date')
    const [isOpen, setIsOpen] = useState(false)
    const t = useTranslations()
    const router = useRouter()
    const weeks = useMemo(() => {
        const weeks = new Set<string>()
        for (const time of times) {
            const { start, end } = getWeekRange(moment(time, 'DD.MM.YYYY').format('DD.MM.YYYY'))
            weeks.add(`${start} - ${end} ${t(moment(start, 'DD.MM.YYYY').get('month') + '-month')}`)
        }
        return [...weeks]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [times])

    const onHandleClick = (week: string) => {
        router.replace(`/schedule?date=${week.split(' ')[0]}&group=М8О-101БВ-24`)
        setIsOpen(false)
    }

    return (
        <>
            <div className="border rounded-lg p-2" onClick={() => setIsOpen(true)}>
                <p className="text-sm">{t('week')}</p>
                <p className="text-lg">
                    {moment(start, 'DD.MM.YYYY').format('DD.MM')} - {moment(end, 'DD.MM.YYYY').format('DD.MM')}
                </p>
            </div>
            <Drawer isOpen={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
                <DrawerContent>
                    <DrawerHeader className="flex flex-col gap-1">{t('weeks')}</DrawerHeader>
                    <DrawerBody>
                        {weeks.map((week) => (
                            <div
                                onClick={() => onHandleClick(week)}
                                className={`${
                                    moment(currentDate, 'DD.MM.YYYY').isBetween(
                                        moment(week.split(' ')[0], 'DD.MM.YYYY'),
                                        moment(week.split(' ')[2], 'DD.MM.YYYY'),
                                        undefined,
                                        '[]'
                                    )
                                        ? 'border-[--tw-ring-color] border-large'
                                        : 'border'
                                } rounded-lg p-2 flex items-center justify-between`}
                                key={week}
                            >
                                <p>{week.split(' ').slice(0, 3).join(' ')}</p>
                                <p className="opacity-50">{week.split(' ')[3]}</p>
                            </div>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
