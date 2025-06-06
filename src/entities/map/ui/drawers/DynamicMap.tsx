import dynamic from 'next/dynamic'
import { Spinner } from "@heroui/spinner"

export const DynamicMap = dynamic(() => import('../Map'), {
    ssr: false,
    loading: () => (
        <div className="flex w-full h-full justify-center items-center">
            <Spinner size="md" />
        </div>
    ),
})
