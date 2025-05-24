// socketService.ts
import { io, Socket } from "socket.io-client";
import { MessageCreate, MessageRead } from "../model/types/message";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";

class SocketService {
	private socket: Socket | null = null;

	connect(chatId: number): Promise<Socket> {
		return new Promise((resolve, reject) => {
			const access_token = document.cookie
				.split("; ")
				.find((row) => row.startsWith(`${ACCESS_TOKEN}=`))
				?.split("=")[1];

			const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
				auth: {
					access_token,
					chat_id: chatId,
				},
				transports: ["websocket"],
			});

			socketIo.on("connect", () => {
				this.socket = socketIo;
				console.log("Socket connected with ID:", socketIo.id);
				resolve(socketIo);
			});

			socketIo.on("connect_error", (error) => {
				console.error("Socket connection error:", error);
				reject(error);
			});
		});
	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
		}
	}

	sendMessage(message: MessageCreate) {
		if (this.socket) {
			const access_token = document.cookie
				.split("; ")
				.find((row) => row.startsWith(`${ACCESS_TOKEN}=`))
				?.split("=")[1];

			this.socket.emit("chat", {
				text: message.text,
				access_token,
				chat_id: message.chat_id,
				is_anonymous: message.is_anonymous,
			});
		} else {
			console.error("Socket not connected");
		}
	}

	onChatMessage(callback: (message: MessageRead) => void) {
		if (this.socket) {
			this.socket.on("chat", callback);
		}
	}

	offChatMessage() {
		if (this.socket) {
			this.socket.off("chat");
		}
	}
}

export const socketService = new SocketService();
