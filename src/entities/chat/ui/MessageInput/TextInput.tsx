import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Dispatch, FC, SetStateAction } from "react";

interface TextInputProps {
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
}

export const TextInput: FC<TextInputProps> = ({ message, setMessage }) => {
	return (
		<>
			<Input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Type your message..."
			/>
			<Button type="submit" disabled={!message.trim()} color="primary">
				Send
			</Button>
		</>
	);
};
