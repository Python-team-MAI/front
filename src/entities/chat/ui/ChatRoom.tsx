import React, { useEffect, useState } from "react";
import { ChatRead, MessageRead } from "../model/types/message";
import { chatApi } from "../api/chatApi";
import { socketService } from "../api/socket";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput/MessageInput";
import { Button } from "@heroui/button";

interface ChatRoomProps {
	chatId: number | undefined;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ chatId }) => {
	const [messages, setMessages] = useState<MessageRead[]>([]);
	const [chat, setChat] = useState<ChatRead | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const initChat = async () => {
			if (!chatId) return;

			try {
				setLoading(true);

				const chatData = await chatApi.getChatById(chatId);
				setChat(chatData);

				const messagesData = await chatApi.getChatMessages(chatId);
				setMessages(messagesData);

				await socketService.connect(chatId);
				setConnected(true);
				setLoading(false);

				socketService.onChatMessage((data) => {
					const newMessage = data;
					setMessages((prev) => [
						...prev,
						{
							id: newMessage.id,
							text: newMessage.text,
							user_id: newMessage.user_id,
							chat_id: newMessage.chat_id,
							created_at: new Date().toISOString(),
							updated_at: new Date().toISOString(),
							is_anonymous: newMessage.is_anonymous,
						},
					]);
				});

				setError(null);
			} catch (err) {
				console.error("Error initializing chat:", err);
				setError("Failed to connect to chat");
			} finally {
				setLoading(false);
			}
		};

		initChat();

		return () => {
			socketService.disconnect();
		};
	}, [chatId]);

	if (!chatId) {
		return (
			<div className="p-6 rounded-lg shadow-md">
				<div className="px-4 py-3 rounded mb-4">Select a chat to join</div>
			</div>
		);
	}

	const handleSendMessage = (text: string, isAnonymous: boolean) => {
		if (!text.trim()) return;

		const messageData = {
			text,
			chat_id: chatId,
			is_anonymous: isAnonymous,
		};

		socketService.sendMessage(messageData);
	};

	const handleDisconnect = () => {
		socketService.disconnect();
	};

	if (loading) {
		return (
			<div className="p-6 rounded-lg shadow-md h-full flex items-center justify-center">
				<div className="text-lg text-gray-600">Connecting to chat...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 rounded-lg shadow-md">
				<div className="px-4 py-3 rounded mb-4">{error}</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg shadow-md flex flex-col h-[80vh]">
			<div className="p-4 flex justify-between items-center">
				<div>
					<h2 className="text-xl font-semibold">{chat?.name || `Chat #${chatId}`}</h2>
					{chat && <p className="text-sm">Type: {chat.type}</p>}
				</div>
				<div className="flex items-center space-x-2">
					<div
						className={`h-3 w-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
					></div>
					<span className="text-sm text-gray-600">{connected ? "Connected" : "Disconnected"}</span>
					<Button onPress={handleDisconnect} className="ml-4" color="danger">
						Disconnect
					</Button>
				</div>
			</div>

			<MessageList messages={messages} />

			<div className="p-4 mt-auto">
				<MessageInput onSendMessage={handleSendMessage} />
			</div>
		</div>
	);
};
