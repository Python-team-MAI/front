import { render, screen } from '@testing-library/react'
import * as routing from '@/entities/i18n/routing'
import { Header } from '../ui/Header'

jest.mock('@/entities/i18n/routing', () => ({
    usePathname: jest.fn(),
}))

jest.mock('../ui/components/ShortHeader', () => ({
    ShortHeader: () => <div data-testid="short-header">Short Header</div>,
}))

jest.mock('../ui/components/LongHeader', () => ({
    LongHeader: () => <div data-testid="long-header">Long Header</div>,
}))

jest.mock('../ui/components/TabBar', () => ({
    TabBar: () => <div data-testid="tab-bar">Tab Bar</div>,
}))

describe('Header', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders ShortHeader for login path', () => {
        jest.spyOn(routing, 'usePathname').mockReturnValue('/login')
        render(<Header session={null} />)
        expect(screen.getByTestId('short-header')).toBeInTheDocument()
        expect(screen.queryByTestId('long-header')).not.toBeInTheDocument()
        expect(screen.queryByTestId('tab-bar')).not.toBeInTheDocument()
    })

    it('renders ShortHeader for register path', () => {
        jest.spyOn(routing, 'usePathname').mockReturnValue('/register')
        render(<Header session={null} />)
        expect(screen.getByTestId('short-header')).toBeInTheDocument()
        expect(screen.queryByTestId('long-header')).not.toBeInTheDocument()
        expect(screen.queryByTestId('tab-bar')).not.toBeInTheDocument()
    })

    it('renders LongHeader and TabBar for other paths', () => {
        jest.spyOn(routing, 'usePathname').mockReturnValue('/')
        render(<Header session={null} />)
        expect(screen.getByTestId('long-header')).toBeInTheDocument()
        expect(screen.getByTestId('tab-bar')).toBeInTheDocument()
        expect(screen.queryByTestId('short-header')).not.toBeInTheDocument()
    })
})
