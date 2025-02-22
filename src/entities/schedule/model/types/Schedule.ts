export type Schedule = Record<string, ScheduleDay> & { group: string }

export interface ScheduleDay {
    day: 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс'
    pairs: Record<string, SchedulePair>
}

export interface SchedulePair {
    [name: string]: {
        time_start: string
        time_end: string
        lector: Record<string, string>
        type: Record<string, number>
        room: Record<string, string>
        lms: string
        teams: string
        other: string
    }
}
