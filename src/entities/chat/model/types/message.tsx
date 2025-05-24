// types.ts
export interface Chat {
	name: string;
	type: string;
	office_id: number;
}

export interface ChatRead extends Chat {
	id: number;
	created_at: string;
	updated_at: string;
}

export type ChatCreate = Chat;

export interface ChatUpdate {
	name?: string;
	type?: string;
	office_id?: number;
}

export interface ChatFilter extends Partial<Chat> {
	id?: number;
	created_at?: string;
	updated_at?: string;
}

export interface MessageRead {
	sid?: number;
	message: {
		id: number;
		text: string;
		user_id: number;
		chat_id: number;
		first_name?: string;
		last_name?: string;
		created_at: string;
		updated_at: string;
		is_anonymous: boolean;
	};
}

export interface MessageCreate {
	text: string;
	chat_id: number;
	is_anonymous: boolean;
}

export interface JoinData {
	sid: number;
	user_id: number;
	chat_id: number;
	first_name: string;
	last_name: string;
}

export interface LeaveData {
	sid: number;
	user_id: number;
	chat_id: number;
}
