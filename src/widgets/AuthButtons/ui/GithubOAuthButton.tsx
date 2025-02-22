import React from 'react'
import { redirect } from '@/navigation'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@nextui-org/button'

export const GithubOAuthButton = () => {
    return (
        <Button
            fullWidth
            className="flex items-center gap-4"
            onPress={async () => {
                'use server'
                redirect({ href: `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/github/`, locale: 'ru' })
            }}
        >
            <FaGithub size={20} />
            <p>Войти через GitHub</p>
        </Button>
    )
}
