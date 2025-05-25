import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./shared/constants/tokens";
import { $fetch } from "@/fetch";
import { checkLocale } from "./shared/lib/utils/middleware/getLocale";

const notAuthRoutes = ["/login", "/register", "/register/email", "/register/success"];

const getNotAuthRoutes = (locale: string) => notAuthRoutes.map((route) => `/${locale}${route}`);

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
	const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

	const { pathname } = request.nextUrl;
	const locale = checkLocale(pathname);

	if (getNotAuthRoutes(locale).includes(pathname)) {
		return NextResponse.next();
	}
	console.log("middleware");

	if (!accessToken) {
		if (refreshToken) {
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

					const res = NextResponse.redirect(request.url);

					const accessTokenMinutes = Number(process.env.ACCESS_TOKEN_EXPIRES) || 60;
					const refreshTokenDays = Number(process.env.REFRESH_TOKEN_EXPIRES) || 1;

					res.cookies.set(ACCESS_TOKEN, data.access_token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict",
						maxAge: accessTokenMinutes * 60,
						path: "/",
					});

					res.cookies.set(REFRESH_TOKEN, data.refresh_token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict",
						maxAge: refreshTokenDays * 60,
						path: "/",
					});

					return res;
				}
			} catch (error) {
				console.error("Ошибка при обновлении токена:", error);
			}
		}
		console.log("!refreshToken");
		const url = request.nextUrl.clone();
		url.pathname = `/${locale}/login`;

		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/(ru|en|ch)/:path*"],
};
