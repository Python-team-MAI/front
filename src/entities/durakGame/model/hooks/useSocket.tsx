import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export const useSocket = (roomId: string, username: string) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const socketInstance = io('http://localhost:8000', {
            query: { roomId, username },
            transports: ['websocket'],
        })

        socketInstance.on('connect', () => {
            setIsConnected(true)
            socketInstance.emit('join_room', { roomId, username })
        })

        socketInstance.on('disconnect', () => {
            setIsConnected(false)
        })

        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
    }, [roomId, username])

    return { socket, isConnected }
}
