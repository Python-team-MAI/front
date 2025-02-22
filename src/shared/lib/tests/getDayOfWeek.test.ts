import { getDayOfWeek } from '@/shared/lib/dates/getDayOfWeek'

describe('getDayOfWeek', () => {
    it('Right dates', () => {
        expect(getDayOfWeek('02.01.2023')).toBe('пн')
        expect(getDayOfWeek('03.01.2023')).toBe('вт')
        expect(getDayOfWeek('04.01.2023')).toBe('ср')
        expect(getDayOfWeek('05.01.2023')).toBe('чт')
        expect(getDayOfWeek('06.01.2023')).toBe('пт')
        expect(getDayOfWeek('07.01.2023')).toBe('сб')
    })

    it('Wrong date', () => {
        expect(getDayOfWeek('32.01.2023')).toBe('')
        expect(getDayOfWeek('')).toBe('')
        expect(getDayOfWeek('invalid-date')).toBe('')
    })

    it('Borderline case', () => {
        expect(getDayOfWeek('01.01.2023')).toBe('вс')
        expect(getDayOfWeek('07.01.2023')).toBe('сб')
    })
})
