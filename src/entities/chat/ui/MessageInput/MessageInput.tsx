// components/MessageInput.tsx
import { Checkbox } from "@heroui/checkbox";
import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { MdInput } from "./MdInput";

interface MessageInputProps {
	onSendMessage: (text: string, isAnonymous: boolean) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
	const [message, setMessage] = useState("");
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [isMd, setIsMd] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim()) {
			onSendMessage(message, isAnonymous);
			setMessage("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-2">
			<div className="flex items-center gap-3">
				<Checkbox checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="mr-2">
					Send anonymously
				</Checkbox>
				<Checkbox checked={isMd} onChange={(e) => setIsMd(e.target.checked)} className="mr-2">
					Select md text input
				</Checkbox>
			</div>

			<div className="flex items-center space-x-2">
				{!isMd ? (
					<TextInput message={message} setMessage={setMessage} />
				) : (
					<MdInput message={message} setMessage={setMessage} />
				)}
			</div>
		</form>
	);
};
