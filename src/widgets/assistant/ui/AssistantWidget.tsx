"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AssistantWidget.module.css";
import { Avatar } from "@heroui/react";
import { Bot, Send, User } from "lucide-react";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { $fetch } from "@/fetch";
import { CookieManager } from "@/shared/lib/utils/cookie/cookie";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface Message {
	id: number;
	text: string;
	type: "user" | "assistant";
	assistant_chat_id?: number;
	user_id?: number;
	created_at: string;
	updated_at?: string;
}

interface AssistantResponse {
	ans: string;
}

export const AssistantWidget: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const scrollAreaRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const accessToken = CookieManager.get(ACCESS_TOKEN);

	useEffect(() => {
		fetchMessages();
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const fetchMessages = async (): Promise<void> => {
		try {
			const response = await $fetch<false>("/assistant-chats/messages/me", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			const data: Message[] = response.data;
			setMessages(data);
		} catch (error) {
			console.error("Error fetching messages:", error);
		}
	};

	const sendMessage = async (): Promise<void> => {
		if (!input.trim()) return;

		try {
			setLoading(true);

			const userMessage: Message = {
				id: Date.now(),
				text: input,
				type: "user",
				created_at: new Date().toISOString(),
			};
			setMessages((prev) => [...prev, userMessage]);
			setInput("");

			const response = await $fetch<false>("/assistant/question", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				data: { message: input },
			});

			const data: AssistantResponse = response.data;

			// Add assistant response
			const assistantMessage: Message = {
				id: Date.now() + 1,
				text: data.ans,
				type: "assistant",
				created_at: new Date().toISOString(),
			};

			setMessages((prev) => [...prev, assistantMessage]);
		} catch (error) {
			console.error("Error sending message:", error);
		} finally {
			setLoading(false);
		}
	};

	const scrollToBottom = (): void => {
		if (scrollAreaRef.current) {
			const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	return (
		<Card className={`${styles.container}`}>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<Avatar>
						<Bot className={styles.botIcon} />
					</Avatar>
					<div>
						<h1 className={styles.title}>Neural Assistant</h1>
						<p className={styles.subtitle}>AI-powered conversation</p>
					</div>
				</div>
			</div>

			<ScrollArea className={styles.messageArea} ref={scrollAreaRef}>
				<div className={styles.messagesContainer}>
					{messages.length === 0 && (
						<div className={styles.emptyState}>
							<Bot className={styles.emptyStateIcon} />
							<p className={styles.emptyStateTitle}>No messages yet</p>
							<p className={styles.emptyStateSubtitle}>Start the conversation by sending a message</p>
						</div>
					)}

					<AnimatePresence>
						{messages.map((message) => (
							<motion.div
								key={message.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className={message.type === "user" ? styles.userMessageContainer : styles.assistantMessageContainer}
							>
								<div className={message.type === "user" ? styles.userMessageWrapper : styles.assistantMessageWrapper}>
									<Avatar className={styles.messageAvatar}>
										{message.type === "assistant" ? (
											<Bot className={styles.smallIcon}  />
										) : (
											<>
												<User className={styles.smallIcon} />
											</>
										)}
									</Avatar>

									<Card className={message.type === "assistant" ? styles.assistantMessage : styles.userMessage}>
										<div className={styles.messageContent}>
											<div className={styles.messageTextWrapper}>
												{message.type === "assistant" ? (
													<MarkdownPreview style={{background: "rgba(31, 41, 55, 0.8)", fontFamily: "Roboto"}} source={message.text} />
												) : (
													<div className={styles.messageText}>{message.text}</div>
												)}
												<div className={styles.messageTime}>{formatDate(message.created_at)}</div>
											</div>
										</div>
									</Card>
								</div>
							</motion.div>
						))}
					</AnimatePresence>

					{loading && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className={styles.assistantMessageContainer}
						>
							<div className={styles.assistantMessageWrapper}>
								<Avatar className={styles.messageAvatar}>
									<Bot className={styles.smallIcon} />
								</Avatar>
								<Card className={styles.assistantMessage}>
									<div className={styles.messageContent}>
										<div className={styles.typingWrapper}>
											<div className={styles.typingIndicator}>
												<span></span>
												<span></span>
												<span></span>
											</div>
											<span className={styles.typingText}>AI is thinking</span>
										</div>
									</div>
								</Card>
							</div>
						</motion.div>
					)}
				</div>
			</ScrollArea>

			<div className={styles.inputArea}>
				<div className={styles.inputContainer}>
					<div className={styles.inputWrapper}>
						<Input
							ref={inputRef}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Type your message..."
							// className={styles.input}
							disabled={loading}
						/>
						<Button
							isLoading={loading}
							onPress={sendMessage}
							disabled={loading || !input.trim()}
							className={styles.sendButton}
						>
							<Send className={styles.sendIcon} />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};
