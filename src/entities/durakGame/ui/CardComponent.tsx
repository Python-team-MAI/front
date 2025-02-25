'use client'

import React from 'react'
import { useDrag } from 'react-dnd'
import { motion } from 'framer-motion'
import { Card as NextUICard } from '@heroui/card'

interface CardProps {
    suit: string
    rank: string
    id: string
    isPlayable: boolean
    onClick?: () => void
}

export const CardComponent: React.FC<CardProps> = ({ suit, rank, id, isPlayable, onClick }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: { id, suit, rank },
        canDrag: isPlayable,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    // Определение цвета карты
    const isRed = suit === 'hearts' || suit === 'diamonds'

    // Определение Unicode символа масти
    const suitSymbol = {
        hearts: '♥',
        diamonds: '♦',
        clubs: '♣',
        spades: '♠',
    }[suit]

    return (
        <motion.div
            ref={drag}
            onClick={onClick}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                y: isDragging ? -10 : 0,
            }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: isPlayable ? 'grab' : 'default',
            }}
        >
            <NextUICard
                className={`w-24 h-36 flex flex-col justify-between p-2 bg-white border-2 ${
                    isPlayable ? 'border-blue-400' : 'border-gray-300'
                }`}
                shadow={isPlayable ? 'md' : 'sm'}
            >
                <div className={`text-lg font-bold ${isRed ? 'text-red-600' : 'text-black'}`}>{rank}</div>
                <div className={`text-center text-4xl ${isRed ? 'text-red-600' : 'text-black'}`}>{suitSymbol}</div>
                <div className={`text-lg font-bold self-end ${isRed ? 'text-red-600' : 'text-black'}`}>{rank}</div>
            </NextUICard>
        </motion.div>
    )
}
