import { redirect } from '@/navigation'
import { Button } from "@heroui/button"
import React from 'react'
import { FaGoogle } from 'react-icons/fa'

export const GoogleOAuthButton = () => {
    return (
        <Button
            color="primary"
            fullWidth
            className="flex items-center gap-4"
            onPress={async () => {
                'use server'
                redirect({ href: `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/google/`, locale: 'ru' })
            }}
        >
            <FaGoogle size={18} />
            <p>Войти через Google</p>
        </Button>
    )
}
