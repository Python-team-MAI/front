'use client'

import React from 'react'
import { getWeekRange } from '@/shared/lib/dates/getWeekRange'
import moment from 'moment'
import { Spinner } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

const Loading = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const date = searchParams.get('date')
    const groupName = searchParams.get('group')
    let currentDate: moment.Moment
    let currentGroup: string
    // Кэш на 12 недель = 7 257 600 секунд

    if (date) {
        currentDate = moment(date, 'DD.MM.YYYY')
        if (!currentDate.isValid()) {
            currentDate = moment()
        }
    } else {
        currentDate = moment()
    }

    if (groupName) {
        currentGroup = groupName
    } else {
        currentGroup = 'М8О-101БВ-24'
    }

    const { start, end } = getWeekRange(currentDate.format('DD.MM.YYYY'))

    return (
        <div className="p-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="border rounded-lg p-2">
                    <p className="text-sm">{t('group')}</p>
                    <p className="text-lg">{currentGroup}</p>
                </div>
                <div className="border rounded-lg p-2">
                    <p className="text-sm">{t('week')}</p>
                    <p className="text-lg">
                        {moment(start, 'DD.MM.YYYY').format('DD.MM')} - {moment(end, 'DD.MM.YYYY').format('DD.MM')}
                    </p>
                </div>{' '}
            </div>
            <div className="flex justify-center items-center py-5">
                <Spinner size="lg" />
            </div>
        </div>
    )
}

export default Loading
