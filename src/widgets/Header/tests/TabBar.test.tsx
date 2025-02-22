import type React from 'react'
import { render, screen } from '@testing-library/react'
import * as routing from '@/entities/i18n/routing'
import * as nextIntl from 'next-intl'
import { TabBar } from '../ui/components/TabBar'

jest.mock('@nextui-org/tabs', () => ({
    Tabs: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs">{children}</div>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Tab: ({ title, href }: { title: string; href: string }) => <div href={href}>{title}</div>,
}))

jest.mock('@/entities/i18n/routing', () => ({
    usePathname: jest.fn(),
}))

jest.mock('next-intl', () => ({
    useLocale: jest.fn(),
}))

jest.mock('moment', () => {
    const mockMoment = jest.fn(() => ({
        format: jest.fn(() => '01.01.2023'),
    }))
    return mockMoment
})

describe('TabBar', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders correctly with default locale and path', () => {
        jest.spyOn(routing, 'usePathname').mockReturnValue('/')
        jest.spyOn(nextIntl, 'useLocale').mockReturnValue('en')

        render(<TabBar />)

        expect(screen.getByText('Главная')).toBeInTheDocument()
        expect(screen.getByText('Расписание')).toBeInTheDocument()
        expect(screen.getByText('Дедлайны')).toBeInTheDocument()
    })

    it('renders correctly with different locale and path', () => {
        jest.spyOn(routing, 'usePathname').mockReturnValue('/schedule')
        jest.spyOn(nextIntl, 'useLocale').mockReturnValue('ru')

        render(<TabBar />)

        expect(screen.getByText('Главная')).toBeInTheDocument()
        expect(screen.getByText('Расписание')).toBeInTheDocument()
        expect(screen.getByText('Дедлайны')).toBeInTheDocument()
    })

    it('uses correct href for schedule tab', () => {
        jest.spyOn(routing, 'usePathname').mockReturnValue('/')
        jest.spyOn(nextIntl, 'useLocale').mockReturnValue('en')

        const { container } = render(<TabBar />)

        const scheduleTab = container.querySelector('[href="/en/schedule?date=01.01.2023&group=М8О-101БВ-24"]')
        expect(scheduleTab).toBeInTheDocument()
    })
})
