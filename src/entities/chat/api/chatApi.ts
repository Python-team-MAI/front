import axios from "axios";
import { ChatCreate, ChatRead, ChatUpdate, MessageRead } from "../model/types/message";

const API_URL = "http://172.22.105.67:8000/api/v1";

export const chatApi = {
	getAllChats: async (): Promise<ChatRead[]> => {
		const response = await axios.get(`${API_URL}/chats`);
		return response.data;
	},

	getChatById: async (chatId: number): Promise<ChatRead> => {
		const response = await axios.get(`${API_URL}/chats/${chatId}`);
		return response.data;
	},

	createChat: async (chatData: ChatCreate): Promise<ChatRead> => {
		const response = await axios.post(`${API_URL}/chats`, chatData);
		return response.data;
	},

	updateChat: async (chatId: number, chatData: ChatUpdate): Promise<ChatRead> => {
		const response = await axios.patch(`${API_URL}/chats/${chatId}`, chatData);
		return response.data;
	},

	deleteChat: async (chatId: number): Promise<void> => {
		await axios.delete(`${API_URL}/chats/${chatId}`);
	},

	getChatMessages: async (chatId: number, page: number = 1): Promise<MessageRead[]> => {
		const response = await axios.get(`${API_URL}/chats/${chatId}/messages?page=${page}`);
		return response.data;
	},
};
