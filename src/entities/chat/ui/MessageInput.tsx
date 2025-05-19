import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React from "react";
import { Message } from "../model/types/message";

interface MessageInputProps {
	onSend: () => void;
	message: Message;
	setMessage: (message: Message) => void;
	disabled: boolean;
}

export const MessageInput = ({ message, setMessage, onSend, disabled }: MessageInputProps) => {
	return (
		<div className="grid grid-cols-[10fr_1fr] gap-2">
			<Input
				placeholder="Введите сообщение"
				value={message.message}
				onChange={(e) => setMessage({ ...message, message: e.target.value })}
			/>
			<Button isDisabled={disabled} color="primary" onPress={onSend}>
				Отправить
			</Button>
		</div>
	);
};
