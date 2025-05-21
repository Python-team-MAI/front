import { Button } from "@heroui/button";
import MDEditor from "@uiw/react-md-editor";
import { Dispatch, FC, SetStateAction } from "react";

interface MdInputProps {
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
}

export const MdInput: FC<MdInputProps> = ({ message, setMessage }) => {
	return (
		<div className="flex flex-col gap-2">
			<MDEditor value={message} onChange={(e) => setMessage(e || "")} />
			<Button type="submit" disabled={!message.trim()} color="primary">
				Send
			</Button>
		</div>
	);
};
