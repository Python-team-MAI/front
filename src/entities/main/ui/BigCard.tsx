import { redirect } from '@/navigation'
import { Button } from '@heroui/button'
import { Card, CardHeader } from '@heroui/card'
import Image from 'next/image'
import React from 'react'
import { BigCardProps } from '../model/types/CardProps'

export const BigCard = ({alt, src, href, text, secondaryText, locale}: BigCardProps & { locale: string }) => {
  return (
    <Card>
        <CardHeader className="flex gap-3">
            <Image
                className="max-md:w-13"
                unoptimized
                alt={alt}
                src={src}
                width={100}
                height={100}
            />
            <div className="flex flex-col">
                <p className="text-md">{text}</p>
                <p className="text-small text-default-500">{secondaryText}</p>
            </div>
            <Button
                onPress={async () => {
                    'use server'
                    redirect({ href, locale })
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
  )
}
