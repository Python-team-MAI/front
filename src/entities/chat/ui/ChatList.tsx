// components/ChatList.tsx
import React, { useEffect, useState } from "react";
import { chatApi } from "../api/chatApi";
import { ChatRead } from "../model/types/message";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDebounce } from "@/shared/hooks";
import { smartSearch } from "@/shared/lib/utils/search/smartSearch";

interface ChatListProps {
	selectedChatId?: number;
	onSelectChat: (chatId: number) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ selectedChatId, onSelectChat }) => {
	const [chats, setChats] = useState<ChatRead[]>([]);
	const [searchChats, setSearchChats] = useState<ChatRead[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const debouncesSearch = useDebounce(search, 300);

	useEffect(() => {
		const fetchChats = async () => {
			try {
				setLoading(true);
				const data = await chatApi.getAllChats();
				setChats(data);
				setError(null);
			} catch (err) {
				setError("Failed to load chats");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchChats();
	}, []);

	useEffect(() => {
		const searched = smartSearch(chats, debouncesSearch, { limit: 20 }).map(({ id }) => id);
		if (debouncesSearch === "") {
			setSearchChats(chats);
		} else {
			setSearchChats(chats.filter(({ id }) => searched.includes(id)));
		}
	}, [debouncesSearch, chats]);

	return (
		<div className="p-4 rounded-lg shadow-md h-full">
			<h2 className="text-xl font-semibold mb-4">Chats</h2>

			{loading && <div className="text-center py-4">Loading chats...</div>}

			{error && <div className="px-4 py-3 rounded mb-4">{error}</div>}

			{!loading && chats.length === 0 && <div className="text-center py-4">No chats found</div>}

			<ul className="space-y-2">
				<Input label="Найдите свою аудиторию" value={search} onChange={(e) => setSearch(e.target.value)} />
				{searchChats.map((chat) => (
					<li key={chat.id}>
						<Button
							color={selectedChatId === chat.id ? "secondary" : "primary"}
							isDisabled={selectedChatId === chat.id}
							onPress={() => onSelectChat(chat.id)}
							className={`w-full text-left px-4 py-2 rounded-md ${selectedChatId === chat.id ? "font-medium" : ""}`}
						>
							<div className="font-medium">{chat.name}</div>
							<div className="text-sm">Type: {chat.type}</div>
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};
