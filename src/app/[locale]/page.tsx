import { Locale, redirect } from '@/entities/i18n/routing'
import { Button } from '@nextui-org/button'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params
    const t = await getTranslations()

    return (
        <main className="p-2">
            <section className="grid max-md:grid-cols-2 grid-cols-4 gap-2">
                <Card className="flex flex-col items-center cursor-pointer">
                    <Image
                        className="max-md:w-24"
                        unoptimized
                        alt="safe"
                        src={'/icons/safe.svg'}
                        width={150}
                        height={150}
                    />
                    <CardFooter className="flex justify-center">{t('payment')}</CardFooter>
                </Card>
                <Card className="flex flex-col items-center cursor-pointer">
                    <Image
                        className="max-md:w-24"
                        unoptimized
                        alt="safe"
                        src={'/icons/laptop.svg'}
                        width={150}
                        height={150}
                    />
                    <CardFooter className="flex justify-center">{t('lms')}</CardFooter>
                </Card>
                <Card className="flex flex-col items-center cursor-pointer">
                    <Image
                        className="max-md:w-24"
                        unoptimized
                        alt="safe"
                        src={'/icons/student.svg'}
                        width={150}
                        height={150}
                    />
                    <CardFooter className="flex justify-center">{t('account')}</CardFooter>
                </Card>
                <Card className="flex flex-col items-center cursor-pointer">
                    <Image
                        className="max-md:w-24"
                        unoptimized
                        alt="safe"
                        src={'/icons/notepad.svg'}
                        width={150}
                        height={150}
                    />
                    <CardFooter className="flex justify-center">{t('admission')}</CardFooter>
                </Card>
            </section>
            <section className="flex justify-center gap-2 m-4">
                <div className="cursor-pointer">
                    <Card className="flex flex-col items-center cursor-pointer">
                        <Image
                            className="max-md:w-16"
                            unoptimized
                            alt="safe"
                            src={'/icons/teacher.svg'}
                            width={100}
                            height={100}
                        />
                    </Card>
                    <p className="text-center m-1 text-sm">{t('teachers')}</p>
                </div>
                <div className="cursor-pointer">
                    <Card className="flex flex-col items-center cursor-pointer">
                        <Image
                            className="max-md:w-16"
                            unoptimized
                            alt="safe"
                            src={'/icons/burger_king.svg'}
                            width={100}
                            height={100}
                        />
                    </Card>
                    <p className="text-center m-1 text-sm">{t('food')}</p>
                </div>
                <div className="cursor-pointer">
                    <Card className="flex flex-col items-center cursor-pointer">
                        <Image
                            className="max-md:w-16"
                            unoptimized
                            alt="safe"
                            src={'/icons/sport.svg'}
                            width={100}
                            height={100}
                        />
                    </Card>
                    <p className="text-center m-1 text-sm">{t('sport')}</p>
                </div>
                <div className="cursor-pointer">
                    <Card className="flex flex-col items-center">
                        <Image
                            className="max-md:w-16"
                            unoptimized
                            alt="safe"
                            src={'/icons/news.svg'}
                            width={100}
                            height={100}
                        />
                    </Card>
                    <p className="text-center m-1 text-sm">{t('news')}</p>
                </div>
            </section>
            <section className="mt-2 flex flex-col gap-2 md:m-7">
                <Card>
                    <CardHeader className="flex gap-3">
                        <Image
                            className="max-md:w-13"
                            unoptimized
                            alt="safe"
                            src={'/icons/map.svg'}
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">{t('main map')}</p>
                            <p className="text-small text-default-500">{t('main map')}</p>
                        </div>
                        <Button
                            onPress={async () => {
                                'use server'
                                redirect({ href: '/map', locale })
                            }}
                            size="lg"
                            variant="shadow"
                            isIconOnly
                            color="primary"
                            className="ml-auto"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                fill="white"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 12h12m0 0-5-5m5 5-5 5"
                                />
                            </svg>
                        </Button>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex gap-3">
                        <Image
                            className="max-md:w-13"
                            unoptimized
                            alt="safe"
                            src={'/icons/tree.svg'}
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">{t('recreation')}</p>
                            <p className="text-small text-default-500">{t('health edu centers')}</p>
                        </div>
                        <Button size="lg" variant="shadow" isIconOnly color="primary" className="ml-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                fill="white"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 12h12m0 0-5-5m5 5-5 5"
                                />
                            </svg>
                        </Button>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex gap-3">
                        <Image
                            className="max-md:w-13"
                            unoptimized
                            alt="safe"
                            src={'/icons/room.svg'}
                            width={100}
                            height={100}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">{t('uni campus')}</p>
                            <p className="text-small text-default-500">{t('dormitories')}</p>
                        </div>
                        <Button size="lg" variant="shadow" isIconOnly color="primary" className="ml-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                fill="white"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 12h12m0 0-5-5m5 5-5 5"
                                />
                            </svg>
                        </Button>
                    </CardHeader>
                </Card>
            </section>
        </main>
    )
}
