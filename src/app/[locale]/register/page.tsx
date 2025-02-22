import { Link, Locale } from '@/entities/i18n/routing'
import { AuthForm } from '@/entities/auth'
import { GithubOAuthButton, GoogleOAuthButton, YandexOAuthButton } from '@/widgets/AuthButtons'
import { Link as NextUILink } from '@nextui-org/link'
import { getTranslations } from 'next-intl/server'

export default async function SignInPage(props: {
    searchParams: Promise<{ callbackUrl: string | undefined }>
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await props.params
    const t = await getTranslations({ locale })

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5 justify-center items-stretch w-1/4 max-sm:w-full">
                <h1 className="text-2xl text-center">{t('registration')}</h1>
                <AuthForm type="register" locale={locale} />
                <div className="flex flex-col gap-1 items-center justify-stretch">
                    <GithubOAuthButton />
                    <GoogleOAuthButton />
                    <YandexOAuthButton />
                </div>
            </div>
            <Link href={{ pathname: '/login' }}>
                <NextUILink as={'div'} className="text-center m-4">
                    {t('there is account')}
                </NextUILink>
            </Link>
        </main>
    )
}
