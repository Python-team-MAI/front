import { getWeekRange } from '../dates/getWeekRange'

describe('getWeekRange', () => {
    test('Standard usage', () => {
        const { start, end } = getWeekRange('11.02.2025')
        expect(start).toBe('10.02.2025')
        expect(end).toBe('16.02.2025')
    })

    test('Wrong date', () => {
        const { start, end } = getWeekRange('40.02.2025')
        expect(start).toBe('')
        expect(end).toBe('')
    })

    test('New Year date', () => {
        const { start, end } = getWeekRange('31.12.2024')
        expect(start).toBe('30.12.2024')
        expect(end).toBe('05.01.2025')
    })

    test('Another date format', () => {
        const { start, end } = getWeekRange('12.31.2024', 'MM.DD.YYYY')
        expect(start).toBe('12.30.2024')
        expect(end).toBe('01.05.2025')
    })

    test('Wrong date format', () => {
        const { start, end } = getWeekRange('12.31.2024')
        expect(start).toBe('')
        expect(end).toBe('')
    })
})
