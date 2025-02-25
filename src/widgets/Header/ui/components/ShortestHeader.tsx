import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar"
import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'

export const ShortestHeader = () => {
    const t = useTranslations()

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand className="cursor-pointer">
                <Image width={70} height={70} className="max-md:hidden" src={'/logo/light_logo.png'} alt="logo" />
                <p className="font-bold text-inherit">{t('logo title')}</p>
            </NavbarBrand>
            <NavbarContent justify="end"></NavbarContent>
        </Navbar>
    )
}
