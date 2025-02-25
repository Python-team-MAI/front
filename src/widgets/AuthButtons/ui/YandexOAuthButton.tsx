import React from 'react'
import { redirect } from '@/navigation'
import { FaYandex } from 'react-icons/fa'
import { Button } from "@heroui/button"

export const YandexOAuthButton = () => {
    return (
        <Button
            color="danger"
            fullWidth
            className="flex items-center gap-4"
            onPress={async () => {
                'use server'
                redirect({ href: `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/yandex/`, locale: 'ru' })
            }}
        >
            <FaYandex size={18} />
            <p>Войти через Яндекс</p>
        </Button>
    )
}
