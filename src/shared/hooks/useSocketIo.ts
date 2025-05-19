import { Message } from "@/entities/chat";
import { useEffect, useRef } from "react";
import { io, Socket} from "socket.io-client";

interface ListenMap {
    connect: () => void
    disconnect: () => void
    chat: (message: Message) => void
}

interface EmitMap {
    chat: (message: Message) => void
    connect: () => void
    disconnect: () => void
}

type SocketType = Socket<ListenMap, EmitMap>

export const useSocketIo = ({chatId, userId}: {userId: string, chatId: string}) => {
    const socketRef = useRef<SocketType>(null)
    
    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_API_URL)
        const socket = io(process.env.NEXT_PUBLIC_API_URL, {
            path: '/sockets',
            transports: ['websocket'],
            auth: {
                user_id: userId, 
                chat_id: chatId
            }
        });

        socket.on('connect', () => {
            console.log('Connected to socket.io');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket.io');
        });

        socket.on('chat', (message: string) => {
            console.log('Received message:', message);
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, [userId, chatId]);

    console.log(socketRef.current)

    return {
        socket: socketRef.current!
    };
};
