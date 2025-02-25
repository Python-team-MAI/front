'use client'

import { GameBoard } from '@/entities/durakGame/ui/GameBoard'
import { Button } from '@heroui/button'
import { Card } from '@heroui/card'
import { Input } from '@heroui/input'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Home() {
    const [username, setUsername] = useState('')
    const [roomId, setRoomId] = useState('')
    const [joinedRoom, setJoinedRoom] = useState(false)

    const handleCreateRoom = () => {
        if (!username) return
        const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase()
        setRoomId(newRoomId)
        setJoinedRoom(true)
    }

    const handleJoinRoom = () => {
        if (!username || !roomId) return
        setJoinedRoom(true)
    }

    if (joinedRoom) {
        return (
            <DndProvider backend={HTML5Backend}>
                <GameBoard roomId={roomId} username={username} />
            </DndProvider>
        )
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex min-h-screen items-center justify-center bg-green-800">
                <Card className="p-8 w-96">
                    <h1 className="text-2xl font-bold mb-4 text-center">Дурак Онлайн</h1>

                    <div className="mb-4">
                        <Input
                            label="Ваше имя"
                            placeholder="Введите имя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="ID комнаты"
                            placeholder="Введите ID комнаты для входа"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            fullWidth
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button color="primary" onPress={handleJoinRoom} disabled={!username || !roomId}>
                            Войти в комнату
                        </Button>
                        <Button color="secondary" onPress={handleCreateRoom} disabled={!username}>
                            Создать комнату
                        </Button>
                    </div>
                </Card>
            </div>
        </DndProvider>
    )
}
