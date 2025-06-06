import { NextRequest, NextResponse } from "next/server";
import {
	ACCESS_TOKEN,
	ACCESS_TOKEN_EXPIRES_MINUTES,
	REFRESH_TOKEN,
	REFRESH_TOKEN_EXPIRES_DAYS,
	USER,
} from "./shared/constants/tokens";
import { $fetch } from "@/fetch";
import { checkLocale } from "./shared/lib/utils/middleware/getLocale";

export const notAuthRoutes = [
	"/login",
	"/register",
	"/register/email",
	"/register/success",
	"/password/forgot",
	"/auth/tg-auth",
	// "/auth/tg-success",
];
const notAuthApiRoutes = ["/api/oauth2/finalize"];

const getNotAuthRoutes = (locale: string) => [
	...notAuthRoutes.map((route) => `/${locale}${route}`),
	...notAuthApiRoutes,
];

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
	const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
	
	const { pathname } = request.nextUrl;
	const locale = checkLocale(pathname);
	
	console.log(pathname, accessToken, refreshToken, )

	if (request.referrer.includes("/api")) {
		return NextResponse.next();
	}

	if (getNotAuthRoutes(locale).includes(pathname)) {
		if (accessToken) {
			const url = request.nextUrl.clone();
			url.pathname = `/${locale}`;
			return NextResponse.redirect(url);
		}
		return NextResponse.next();
	}

	if (!accessToken || accessToken === "") {
		if (refreshToken && refreshToken !== "") {
			try {
				const response = await $fetch(`/auth/refresh`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ refreshToken }),
				});

				if (response.ok) {
					const data = await response.json();

					const res = NextResponse.next();

					res.cookies.set(ACCESS_TOKEN, data.access_token, {
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict",
						maxAge: ACCESS_TOKEN_EXPIRES_MINUTES,
						path: "/",
					});

					res.cookies.set(REFRESH_TOKEN, data.refresh_token, {
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict",
						maxAge: REFRESH_TOKEN_EXPIRES_DAYS,
						path: "/",
					});

					const userRes = await $fetch("/auth/me", {
						headers: { Authorization: `Bearer ${data.access_token}` },
					});
					const user = await userRes.json();
					res.cookies.set(USER, JSON.stringify(user), {
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict",
						maxAge: REFRESH_TOKEN_EXPIRES_DAYS,
						path: "/",
					});

					return res;
				}
			} catch (error) {
				console.error("Ошибка при обновлении токена:", error);

				return NextResponse.next()
			}
		}
		const url = request.nextUrl.clone();
		url.pathname = `/${locale}/login`;

		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/(ru|en|ch)/:path*"],
};
