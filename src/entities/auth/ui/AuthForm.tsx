'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/navigation'
import { FC } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/constants/tokens'
import { $fetch } from '@/fetch'

interface AuthFormProps {
    type: 'login' | 'register'
}

export const AuthForm: FC<AuthFormProps> = ({ type }) => {
    const t = useTranslations()
    const router = useRouter()

    return (
        <form
            className="flex flex-col gap-2 w-full"
            action={async (formData) => {
                const email = formData.get('email')?.toString()
                const password = formData.get('password')?.toString()
                if (!email || !password) {
                    return
                }
                try {
                    const res = await $fetch(type === 'login' ? `/auth/login/` : `/auth/register/`, {
                        method: 'POST',
                        body: JSON.stringify(type === 'login' ? { username: email, password } : { email, password }),
                        credentials: 'include',
                    })
                    if (res.ok) {
                        const user = await res.json()
                        if (type === 'login') {
                            localStorage.setItem(ACCESS_TOKEN, user.access_token)
                            localStorage.setItem(REFRESH_TOKEN, user.refresh_token)
                            router.push('/')
                        } else {
                            router.push('/register/info')
                            localStorage.setItem('register_id', user.id)
                        }
                        return
                    }
                } catch (e) {
                    console.log(e)
                }
            }}
        >
            <Input className="w-full" label={t('email')} name="email" id="email" type="email" />
            <Input className="w-full" label={t('password')} name="password" id="password" type="password" />
            <Button color="primary" className="w-full" type="submit">
                {t('sign in')}
            </Button>
        </form>
    )
}
