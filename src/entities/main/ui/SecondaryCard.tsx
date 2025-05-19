import { Card } from '@heroui/card'
import Image from 'next/image'
import React from 'react'
import { CardProps } from '../model/types/CardProps'

export const SecondaryCard = ({alt, src, text}: CardProps) => {
  return (
     <div className="cursor-pointer">
        <Card className="flex flex-col items-center cursor-pointer">
            <Image
                className="max-md:w-16"
                unoptimized
                alt={alt}
                src={src}
                width={100}
                height={100}
            />
        </Card>
        <p className="text-center m-1 text-sm">{text}</p>
    </div>
  )
}
