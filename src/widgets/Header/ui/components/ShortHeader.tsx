'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar"
import Image from 'next/image'
import React from 'react'
import { ThemeSwitcher } from '../../../ThemeSwitcher'
import { LanguageSwitcher } from '../../../LanguageSwitcher'
import { useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'

export const ShortHeader = () => {
    const router = useRouter()
    const t = useTranslations()

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand onClick={() => router.push('/')} className="cursor-pointer">
                <Image width={70} height={70} className="max-md:hidden" src={'/logo/light_logo.png'} alt="logo" />
                <p className="font-bold text-inherit">{t('logo title')}</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>
                    <LanguageSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
