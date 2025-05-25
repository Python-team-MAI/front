import { $fetch } from "@/fetch";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { cookies } from "next/headers";

export async function getCurrentUser() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

	if (!accessToken) {
		return null;
	}

	try {
		const response = await $fetch(`/users/me`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			next: { revalidate: 0 },
		});

		if (!response.ok) {
			return null;
		}

		return await response.json();
	} catch (error) {
		console.error("Ошибка при получении данных пользователя:", error);
		return null;
	}
}

export async function isAuthenticated() {
	const user = await getCurrentUser();
	return !!user;
}

export async function refreshTokens(refreshToken: string) {
	try {
		const response = await fetch(`/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error("Невозможно обновить токен");
		}

		return await response.json();
	} catch (error) {
		console.error("Ошибка при обновлении токена:", error);
		return null;
	}
}
