import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useTranslations } from 'next-intl'
import { redirect } from '@/navigation'
import { FC } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/constants/tokens'
import { $fetch } from '@/fetch'
import { SessionManager } from '@/session'

interface AuthFormProps {
    type: 'login' | 'register'
    locale: string
}

export const AuthForm: FC<AuthFormProps> = ({ type, locale }) => {
    const t = useTranslations()

    return (
        <form
            className="flex flex-col gap-2 w-full"
            action={async (formData) => {
                'use server'

                const email = formData.get('email')?.toString()
                const password = formData.get('password')?.toString()
                if (!email || !password) {
                    return
                }

                try {
                    const res = await $fetch(type === 'login' ? `/auth/login/` : `/auth/register/`, {
                        method: 'POST',
                        body: JSON.stringify({ email, password }),
                        credentials: 'include',
                    })

                    if (res.status === 200) {
                        const result: { access_token: string; refresh_token: string; type: 'Bearer' } = await res.json()
                        if (type === 'login') {
                            SessionManager.setSessionKey(ACCESS_TOKEN, result.access_token)
                            SessionManager.setSessionKey(REFRESH_TOKEN, result.refresh_token)
                            redirect({ href: '/', locale })
                        } else {
                            SessionManager.setSessionKey(ACCESS_TOKEN, result.access_token)
                            SessionManager.setSessionKey(REFRESH_TOKEN, result.refresh_token)
                            redirect({ href: '/register/info', locale })
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
