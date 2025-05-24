import { ChatCreate, ChatRead, ChatUpdate, MessageRead } from "../model/types/message";
import { $fetch } from "@/fetch";

export const chatApi = {
	getAllChats: async (): Promise<ChatRead[]> => {
		const response = await $fetch<false>(`/chats`);
		return response.data;
	},

	getChatById: async (chatId: number): Promise<ChatRead> => {
		const response = await $fetch<false>(`/chats/${chatId}`);
		return response.data;
	},

	createChat: async (chatData: ChatCreate): Promise<ChatRead> => {
		const response = await $fetch<false>(`/chats`, { data: chatData, method: "POST" });
		return response.data;
	},

	updateChat: async (chatId: number, chatData: ChatUpdate): Promise<ChatRead> => {
		const response = await $fetch<false>(`/chats/${chatId}`, { data: chatData, method: "PUT" });
		return response.data;
	},

	deleteChat: async (chatId: number): Promise<void> => {
		await $fetch<false>(`/chats/${chatId}`, { method: "DELETE" });
	},

	getChatMessages: async (chatId: number, page: number = 1): Promise<MessageRead["message"][]> => {
		const response = await $fetch<false>(`/chats/${chatId}/messages?page=${page}`);
		return response.data;
	},
};
