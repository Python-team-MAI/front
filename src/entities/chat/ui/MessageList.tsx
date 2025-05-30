import React, { useEffect, useRef } from "react";
import { MessageRead } from "../model/types/message";
import { Card } from "@heroui/card";

interface MessageListProps {
	messages: MessageRead[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
	const endOfMessagesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	console.log(messages);

	return (
		<div className="flex-1 p-4 overflow-y-auto">
			{messages.length === 0 ? (
				<div className="flex items-center justify-center h-full">No messages yet. Start a conversation!</div>
			) : (
				<div className="space-y-4">
					{messages.map(({ message }) => {
						return (
							<div key={message.id} className={`flex justify-end`}>
								<Card
									className={`max-w-[70%] min-w-[30%] overflow-x-auto rounded-lg px-4 py-2 bg-indigo-500 text-white`}
								>
									{message.is_anonymous ? (
										<div className="text-xs mb-1 opacity-70">Anonymous</div>
									) : (
										<div className="text-xs mb-1 opacity-70">
											{message?.user?.first_name} {message?.user?.first_name}
										</div>
									)}
									<div>{message.text}</div>
									<div className="text-xs mt-1 opacity-70 text-right">{formatTime(message.created_at)}</div>
								</Card>
							</div>
						);
					})}
					<div ref={endOfMessagesRef} />
				</div>
			)}
		</div>
	);
};
