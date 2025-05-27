import moment from 'moment'

export function getWeekRange(dateString: string, format?: string) {
    const date = moment(dateString, format ? format : 'DD.MM.YYYY')

    if (!date.isValid()) {
        return { start: '', end: '' }
    }

    const startOfWeek = date.clone().startOf('isoWeek')
    const endOfWeek = date.clone().endOf('isoWeek')

    return {
        start: startOfWeek.format(format ? format : 'DD.MM.YYYY'),
        end: endOfWeek.format(format ? format : 'DD.MM.YYYY'),
    }
}
