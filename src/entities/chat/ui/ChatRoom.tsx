import React, { useEffect, useState } from "react";
import { ChatRead, MessageRead } from "../model/types/message";
import { chatApi } from "../api/chatApi";
import { socketService } from "../api/socket";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput/MessageInput";
import { Office } from "@/entities/map";

interface ChatRoomProps {
	chatId?: number | undefined;
	office?: Office;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ chatId, office }) => {
	const [messages, setMessages] = useState<MessageRead[]>([]);
	const [chat, setChat] = useState<ChatRead | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const initChat = async () => {
			try {
				setLoading(true);

				let chatData: ChatRead;
				if (chatId) {
					chatData = await chatApi.getChatById(chatId);
				} else {
					chatData = await chatApi.createChat({
						name: office!.name,
						office_id: office!.id,
						type: office!.type!,
					});
				}

				setChat(chatData);

				const messagesData = await chatApi.getChatMessages(chatData.id);
				setMessages(messagesData.map((message) => ({ message })));

				await socketService.connect(chatData.id);
				setLoading(false);

				socketService.onChatMessage((data) => {
					const { message } = data;
					setMessages((prev) => [
						...prev,
						{
							message: {
								id: message.id,
								text: message.text,
								user_id: message.user_id,
								chat_id: message.chat_id,
								created_at: new Date().toISOString(),
								updated_at: new Date().toISOString(),
								is_anonymous: message.is_anonymous,
							},
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

	const handleSendMessage = (text: string, isAnonymous: boolean) => {
		if (!text.trim()) return;

		const messageData = {
			text,
			chat_id: chat!.id,
			is_anonymous: isAnonymous,
		};

		socketService.sendMessage(messageData);
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
			<MessageList messages={messages} />

			<div className="p-4 mt-auto">
				<MessageInput onSendMessage={handleSendMessage} />
			</div>
		</div>
	);
};
