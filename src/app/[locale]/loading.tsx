import { Spinner } from '@nextui-org/spinner'
import React from 'react'

export default function Loading() {
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <Spinner size="lg" />
        </div>
    )
}
