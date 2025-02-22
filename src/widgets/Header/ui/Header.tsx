'use client'

import { usePathname } from '@/entities/i18n/routing'
import { ShortHeader } from './components/ShortHeader'
import { TabBar } from './components/TabBar'
import { LongHeader } from './components/LongHeader'
import { FC } from 'react'
import { ShortestHeader } from './components/ShortestHeader'

interface HeaderProps {
    isShort?: boolean
}

export const Header: FC<HeaderProps> = ({ isShort }) => {
    const pathname = usePathname()

    if (isShort) {
        return <ShortestHeader />
    }

    if (pathname === '/login' || pathname === '/register' || pathname === '/register/info') {
        return <ShortHeader />
    }

    return (
        <>
            <LongHeader />
            <TabBar />
        </>
    )
}
