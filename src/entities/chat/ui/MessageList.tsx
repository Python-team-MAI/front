import React from "react";
import { MessageCard } from "./MessageCard";
import { Message } from "../model/types/message";

interface MessageListProps {
	messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
	if (messages.length === 0) {
		return (
			<div className="flex justify-start items-center ">
				<h2>Сообщений пока нет</h2>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{messages.map((message) => (
				<MessageCard key={message.message + message.sid} message={message} />
			))}
		</div>
	);
};
