import React from 'react'
import { Schedule } from '@/entities/schedule'
import { getWeekRange } from '@/shared/lib/dates/getWeekRange'
import * as crypto from 'crypto'
import moment from 'moment'
import { ScheduleClient } from './Schedule'
import { WeekDrawer } from '@/features/WeekDrawer'
import { GroupDrawer } from '@/features/GroupDrawer'

async function fetchSchedule(groupName: string): Promise<Schedule> {
    const hash = crypto.createHash('md5').update(groupName).digest('hex')
    // Кэш на 12 недель = 7 257 600 секунд
    const res = await fetch(`https://public.mai.ru/schedule/data/${hash}.json`, { next: { revalidate: 7257600 } })
    return await res.json()
}

const SchedulePageServer = async ({
    searchParams,
}: {
    searchParams: Promise<{ date: string; group: string }>
    params: Promise<{ locale: string }>
}) => {
    const { date, group: groupName } = await searchParams
    let currentDate: moment.Moment
    let currentGroup: string
    // Кэш на 12 недель = 7 257 600 секунд
    const groups = await fetch('https://public.mai.ru/schedule/data/groups.json', { next: { revalidate: 7257600 } })

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

    const schedule = await fetchSchedule(groupName)
    const { start, end } = getWeekRange(currentDate.format('DD.MM.YYYY'))

    if (!schedule) {
        return <div>Расписание не найдено</div>
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { group, ...scheduleDays } = schedule
    const times = Object.keys(scheduleDays)

    return (
        <div className="p-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
                <GroupDrawer currentGroup={currentGroup} groups={await groups.json()} />
                <WeekDrawer end={end} start={start} times={times} />
            </div>
            <ScheduleClient schedule={schedule} groupName={groupName} date={date} />
        </div>
    )
}

export default SchedulePageServer
