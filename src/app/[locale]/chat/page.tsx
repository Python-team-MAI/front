"use client";

import { Message, MessageInput, MessageList } from "@/entities/chat";
import { useSocketIo } from "@/shared/hooks/useSocketIo";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";

const ChatPage = () => {
	const [message, setMessage] = useState<Message>({ message: "", sid: "" });
	const [messages, setMessages] = useState<Message[]>([]);
	const [userId, setUserId] = useState("");
	const [chatId, setChatId] = useState("");
	const { socket } = useSocketIo({ chatId, userId });

	const onSend = () => {
		socket.emit("chat", message);
	};

	return (
		<main className="py-10 flex flex-col gap-5">
			<div className="grid grid-cols-3 gap-4">
				<Input placeholder="user_id" value={userId} onChange={(e) => setUserId(e.target.value)} />
				<Input placeholder="chat_id" value={chatId} onChange={(e) => setChatId(e.target.value)} />
				<Button
					color="primary"
					isDisabled={userId === "" || chatId === ""}
					onPress={() => socket.emit("connect")}
				>
					Подключиться
				</Button>
			</div>
			<MessageList messages={messages} />
			<MessageInput
				disabled={userId === "" || chatId === "" || message.message === ""}
				message={message}
				setMessage={setMessage}
				onSend={onSend}
			/>
		</main>
	);
};

export default ChatPage;
