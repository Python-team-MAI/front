import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { $fetch } from "@/fetch";
import {
	ACCESS_TOKEN,
	ACCESS_TOKEN_EXPIRES_MINUTES,
	REFRESH_TOKEN,
	REFRESH_TOKEN_EXPIRES_DAYS,
} from "@/shared/constants/tokens";

export async function POST(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const code = url.searchParams.get("code");

		if (!code) {
			return Response.json({ error: "Code parameter is required" }, { status: 400 });
		}

		const response = await $fetch(`/oauth2/finalize?code=${code}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			return Response.json({ error: "Failed to authenticate", details: errorData }, { status: response.status });
		}

		const { access_token, refresh_token } = await response.json();

		const cookieStore = await cookies();

		cookieStore.set(ACCESS_TOKEN, access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: ACCESS_TOKEN_EXPIRES_MINUTES * 60 * 1000,
			path: "/",
		});

		cookieStore.set(REFRESH_TOKEN, refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
			path: "/",
		});

		redirect("/ru");
	} catch (error) {
		console.error("OAuth finalization error:", error);

		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
