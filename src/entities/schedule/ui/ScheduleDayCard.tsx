import React, { FC } from 'react'
import { ScheduleDay } from '../model/types/Schedule'
import { Card } from "@heroui/card"

interface Props {
    day: ScheduleDay
}

const splitTime = (timeString: string) => {
    const arr = timeString.split(':')
    return arr[0] + ':' + arr[1]
}

export const ScheduleDayCard: FC<Props> = ({ day }) => {
    return (
        <div className="flex flex-col gap-2">
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {Object.entries(day.pairs).map(([time, pair]) =>
                Object.entries(pair).map(([key, value]) => (
                    <Card className="p-3 flex flex-row items-center gap-4" key={value.time_start}>
                        <p className="text-lg">{Object.entries(value.type).map(([name, isIt]) => isIt && name)}</p>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="text-lg">{key}</p>
                                <p className="text-sm">
                                    {splitTime(value.time_start)} - {splitTime(value.time_end)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {Object.values(value.lector).map(
                                    (name) =>
                                        name && (
                                            <p className="text-xs" key={name}>
                                                {name}
                                            </p>
                                        )
                                )}
                                {Object.values(value.room).map(
                                    (name) =>
                                        name && (
                                            <p className="text-xs" key={name}>
                                                {name}
                                            </p>
                                        )
                                )}
                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
    )
}
