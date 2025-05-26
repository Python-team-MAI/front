import { User } from "@/entities/user";

export interface Deadline {
	id: number;
	name: string;
	date_from?: string;
	date_to: string;
	teacher: string;
	author: User;
	group: string;
	lesson: string;
	description: string;
}
