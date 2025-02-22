'use client'

import { Button } from '@nextui-org/button'
import { Header } from '@/widgets/Header'
import { useRouter } from '@/navigation'

export const NotFoundPage = () => {
    const router = useRouter()

    return (
        <>
            <Header isShort />
            <div className="px-[10vw] max-md:px-2">
                <div className="flex flex-col gap-3 justify-center items-center my-44 p-5 border rounded-lg">
                    <p className="text-2xl text-center font-bold">404: Страница не найдена</p>
                    <p className="text-xl text-center">Простите, вы перешли на несуществующую страницу</p>

                    <div className="flex w-full justify-evenly gap-3 items-center">
                        <Button
                            size="lg"
                            fullWidth
                            onPress={async () => {
                                router.push('/ru')
                            }}
                        >
                            На главную
                        </Button>
                        <Button
                            size="lg"
                            fullWidth
                            onPress={async () => {
                                router.push('/ru/support')
                            }}
                        >
                            Техподдержка
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
