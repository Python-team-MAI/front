import { getContrastingColor } from '../colors/getContrastingColor'

describe('getContrastingColor', () => {
    it('Should Return #FFFFFF For Dark Colors (6-Character Hex)', () => {
        expect(getContrastingColor('#000000')).toBe('#FFFFFF')
        expect(getContrastingColor('#000080')).toBe('#FFFFFF')
        expect(getContrastingColor('#800000')).toBe('#FFFFFF')
    })

    it('Should Return #000000 For Light Colors (6-Character Hex)', () => {
        expect(getContrastingColor('#FFFFFF')).toBe('#000000')
        expect(getContrastingColor('#FFFF00')).toBe('#000000')
        expect(getContrastingColor('#00FFFF')).toBe('#000000')
    })

    it('Should Correctly Handle 3-Character Hex Codes', () => {
        expect(getContrastingColor('#000')).toBe('#FFFFFF')
        expect(getContrastingColor('#FFF')).toBe('#000000')
        expect(getContrastingColor('#080')).toBe('#FFFFFF')
    })

    it('Should Handle Edge Cases (Brightness Exactly 128)', () => {
        expect(getContrastingColor('#808080')).toBe('#FFFFFF')
        expect(getContrastingColor('#808081')).toBe('#000000')
        expect(getContrastingColor('#80807F')).toBe('#FFFFFF')
    })

    it('Should Handle Invalid Hex Codes Gracefully', () => {
        expect(getContrastingColor('#ZZZ')).toBe('#000000')
        expect(getContrastingColor('#12345')).toBe('#000000')
    })
})
