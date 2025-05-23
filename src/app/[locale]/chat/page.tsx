"use client";
import { ChatList } from "@/entities/chat/ui/ChatList";
import { ChatRoom } from "@/entities/chat/ui/ChatRoom";
import { useState } from "react";

const App: React.FC = () => {
	const [selectedChatId, setSelectedChatId] = useState<number | undefined>();

	return (
		<div className="min-h-screen">
			<div className="container mx-auto p-4">
				<div className="flex flex-col space-y-4">
					<h1 className="text-3xl font-bold text-center">React 19 Chat Application</h1>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="md:col-span-1">
							<ChatList selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
						</div>
						<div className="md:col-span-2">
							<ChatRoom chatId={selectedChatId} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
