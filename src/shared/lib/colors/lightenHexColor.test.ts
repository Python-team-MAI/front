import { lightenHexColor } from '../colors/lightenHexColor'

describe('lightenHexColor', () => {
    it('Should Correctly Lighten A 6-Character Hex Color', () => {
        expect(lightenHexColor('#000000', 50)).toBe('#7f7f7f')
        expect(lightenHexColor('#FF0000', 20)).toBe('#ff3333')
        expect(lightenHexColor('#00FF00', 30)).toBe('#4cff4c')
        expect(lightenHexColor('#0000FF', 40)).toBe('#6666ff')
    })

    it('Should Correctly Lighten A 3-Character Hex Color', () => {
        expect(lightenHexColor('#000', 50)).toBe('#7f7f7f')
        expect(lightenHexColor('#F00', 20)).toBe('#ff3333')
        expect(lightenHexColor('#0F0', 30)).toBe('#4cff4c')
        expect(lightenHexColor('#00F', 40)).toBe('#6666ff')
    })

    it('Should Handle Maximum Lightening (100%)', () => {
        expect(lightenHexColor('#000000', 100)).toBe('#ffffff')
        expect(lightenHexColor('#123456', 100)).toBe('#ffffff')
    })

    it('Should Handle No Lightening (0%)', () => {
        expect(lightenHexColor('#000000', 0)).toBe('#000000')
        expect(lightenHexColor('#FFFFFF', 0)).toBe('#ffffff')
    })

    it('Should Handle Edge Cases (Invalid Percentages)', () => {
        expect(lightenHexColor('#000000', -10)).toBe('#000000')
        expect(lightenHexColor('#000000', 150)).toBe('#ffffff')
    })

    it('Should Handle Invalid Hex Codes Gracefully', () => {
        expect(lightenHexColor('#ZZZ', 50)).toBe('#000000')
        expect(lightenHexColor('#12345', 50)).toBe('#000000')
    })
})
