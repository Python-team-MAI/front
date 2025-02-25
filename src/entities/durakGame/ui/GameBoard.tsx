// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import React, { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { motion } from 'framer-motion'
import { CardComponent } from './CardComponent'
import { useSocket } from '../model/hooks/useSocket'
import { Card } from '@heroui/card'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/spinner'
import { Tooltip } from '@heroui/tooltip'

interface CardType {
    id: string
    suit: string
    rank: string
}

interface GameBoardProps {
    roomId: string
    username: string
}

export const GameBoard: React.FC<GameBoardProps> = ({ roomId, username }) => {
    const [hand, setHand] = useState<CardType[]>([])
    const [tableCards, setTableCards] = useState<{ attack: CardType; defense?: CardType }[]>([])
    const [deckCount, setDeckCount] = useState<number>(0)
    const [trumpCard, setTrumpCard] = useState<CardType | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState<string>('')
    const [opponent, setOpponent] = useState<{ username: string; cardCount: number } | null>(null)
    const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
    const [winner, setWinner] = useState<string | null>(null)
    const [isAttacker, setIsAttacker] = useState<boolean>(false)

    const { socket } = useSocket(roomId, username)

    useEffect(() => {
        if (!socket) return

        socket.on('game_update', (data) => {
            setHand(data.hand || [])
            setTableCards(data.tableCards || [])
            setDeckCount(data.deckCount || 0)
            setTrumpCard(data.trumpCard || null)
            setCurrentPlayer(data.currentPlayer || '')
            setOpponent(data.opponent || null)
            setGameState(data.gameState || 'waiting')
            setWinner(data.winner || null)
            setIsAttacker(data.isAttacker || false)
        })

        socket.on('waiting_for_player', () => {
            setGameState('waiting')
        })

        socket.on('game_started', () => {
            setGameState('playing')
        })

        socket.on('game_finished', (data) => {
            setGameState('finished')
            setWinner(data.winner)
        })

        return () => {
            socket.off('game_update')
            socket.off('waiting_for_player')
            socket.off('game_started')
            socket.off('game_finished')
        }
    }, [socket])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'card',
        drop: (item) => handleCardPlay(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const handleCardPlay = (card: CardType) => {
        if (!socket) return

        socket.emit('play_card', {
            cardId: card.id,
            roomId,
        })
    }

    const handleTakeCards = () => {
        if (!socket) return
        socket.emit('take_cards', { roomId })
    }

    const handleDoneAttacking = () => {
        if (!socket) return
        socket.emit('done_attacking', { roomId })
    }

    if (gameState === 'waiting') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-green-800">
                <Card className="p-8 text-center">
                    <h2 className="text-2xl mb-4">Ожидание игрока</h2>
                    <p className="mb-4">Комната: {roomId}</p>
                    <div className="flex justify-center">
                        <Spinner size="lg" color="primary" />
                    </div>
                </Card>
            </div>
        )
    }

    if (gameState === 'finished') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-green-800">
                <Card className="p-8 text-center">
                    <h2 className="text-2xl mb-4">{winner === username ? 'Вы выиграли!' : 'Вы проиграли!'}</h2>
                    <Button color="primary" onPress={() => window.location.reload()}>
                        Начать новую игру
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col items-center justify-between h-screen bg-green-800 p-4">
                {/* Карты оппонента */}
                {opponent && (
                    <div className="w-full flex flex-col items-center mb-4">
                        <h3 className="text-white mb-2">{opponent.username}</h3>
                        <div className="flex justify-center">
                            {Array.from({ length: opponent.cardCount }).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-16 h-24 bg-blue-700 rounded-lg border-2 border-white shadow-md"
                                    style={{
                                        marginLeft: index > 0 ? '-40px' : '0',
                                        transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Игровое поле */}
                <div
                    ref={drop}
                    className={`w-full max-w-3xl h-64 rounded-lg flex flex-wrap justify-center items-center relative ${
                        isOver ? 'bg-green-700' : 'bg-green-600'
                    }`}
                >
                    {tableCards.length === 0 && (
                        <div className="text-white text-xl opacity-50">
                            {isAttacker ? 'Перетащите карту для атаки' : 'Ожидание атаки противника'}
                        </div>
                    )}

                    {tableCards.map((pair, index) => (
                        <div key={index} className="flex flex-col items-center mx-2 relative">
                            <motion.div
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CardComponent
                                    suit={pair.attack.suit}
                                    rank={pair.attack.rank}
                                    id={pair.attack.id}
                                    isPlayable={false}
                                />
                            </motion.div>

                            {pair.defense && (
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: -30, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute top-10"
                                >
                                    <CardComponent
                                        suit={pair.defense.suit}
                                        rank={pair.defense.rank}
                                        id={pair.defense.id}
                                        isPlayable={false}
                                    />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Информация об игре */}
                <div className="flex justify-between w-full max-w-3xl my-4">
                    {/* Колода */}
                    <div className="flex items-center">
                        {trumpCard && (
                            <Tooltip content="Козырная карта">
                                <div className="transform rotate-90 mr-2">
                                    <CardComponent
                                        suit={trumpCard.suit}
                                        rank={trumpCard.rank}
                                        id={trumpCard.id}
                                        isPlayable={false}
                                    />
                                </div>
                            </Tooltip>
                        )}
                        {deckCount > 0 && (
                            <div className="relative">
                                {Array.from({ length: Math.min(5, deckCount) }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="absolute w-20 h-32 bg-blue-700 rounded-lg border-2 border-white shadow-md"
                                        style={{
                                            left: `${index * 2}px`,
                                            top: `${index * 2}px`,
                                            zIndex: 5 - index,
                                        }}
                                    />
                                ))}
                                <div className="ml-16 text-white">{deckCount} карт</div>
                            </div>
                        )}
                    </div>

                    {/* Действия */}
                    <div className="flex items-center">
                        {currentPlayer === username ? (
                            <>
                                {isAttacker ? (
                                    <Button color="warning" onPress={handleDoneAttacking}>
                                        Закончить атаку
                                    </Button>
                                ) : (
                                    <Button color="danger" onPress={handleTakeCards}>
                                        Взять карты
                                    </Button>
                                )}
                            </>
                        ) : (
                            <div className="bg-gray-700 text-white py-2 px-4 rounded">Ход игрока {currentPlayer}</div>
                        )}
                    </div>
                </div>

                {/* Карты игрока */}
                <div className="w-full max-w-3xl flex justify-center mb-8">
                    <div className="flex flex-wrap justify-center">
                        {hand.map((card, index) => (
                            <div
                                key={card.id}
                                className="mx-2 transform hover:translate-y-4 transition-transform duration-200"
                                style={{
                                    marginLeft: index > 0 ? '-20px' : '0',
                                }}
                            >
                                <CardComponent
                                    suit={card.suit}
                                    rank={card.rank}
                                    id={card.id}
                                    isPlayable={currentPlayer === username}
                                    onClick={() => handleCardPlay(card)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DndProvider>
    )
}
