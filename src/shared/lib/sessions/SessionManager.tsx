import { cookies } from "next/headers";

export class SessionManager {
	static async getSession(key: string) {
		const cookieStore = await cookies();
		return cookieStore.get(key)?.value;
	}

	static async deleteSessionKey(key: string) {
		const cookieStore = await cookies();
		return cookieStore.delete(key);
	}

	static async setSessionKey(key: string, value: string) {
		const cookieStore = await cookies();
		return cookieStore.set(key, value);
	}
}
