import moment from 'moment'

export function getDayOfWeek(dateString: string) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    const date = moment(dateString, 'DD.MM.YYYY')
    if (!date.isValid()) {
        return ''
    }

    const dayIndex = date.day()
    return days[dayIndex]
}
