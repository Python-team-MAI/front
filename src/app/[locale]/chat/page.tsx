"use client";
import { ChatList } from "@/entities/chat/ui/ChatList";
import { ChatRoom } from "@/entities/chat/ui/ChatRoom";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React, { useState } from "react";

const App: React.FC = () => {
	const [selectedChatId, setSelectedChatId] = useState<number | undefined>();
	const [isConnected, setIsConnected] = useState(false);

	const handleConnect = () => {
		if (selectedChatId) {
			setIsConnected(true);
		} else {
			alert("Please enter both User ID and Chat ID");
		}
	};

	const handleDisconnect = () => {
		setIsConnected(false);
	};

	return (
		<div className="min-h-screen">
			<div className="container mx-auto p-4">
				<div className="flex flex-col space-y-4">
					<h1 className="text-3xl font-bold text-center">React 19 Chat Application</h1>

					{!isConnected ? (
						<div className="p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-semibold mb-4">Connect to Chat</h2>
							<div className="space-y-4">
								<Input
									id="chatId"
									type="number"
									label="Chat ID"
									className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm "
									value={String(selectedChatId) || ""}
									onChange={(e) => setSelectedChatId(Number(e.target.value))}
									placeholder="Enter chat ID"
								/>

								<Button
									onPress={handleConnect}
									className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2"
								>
									Connect to Chat
								</Button>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="md:col-span-1">
								<ChatList selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
							</div>
							<div className="md:col-span-2">
								<ChatRoom chatId={selectedChatId!} onDisconnect={handleDisconnect} />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
