"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import { FC, useState } from "react";
import { addToast } from "@heroui/react";
import { isEmail } from "@/shared/validation/isEmail";
import { $fetch } from "@/fetch";
import { CookieManager } from "@/shared/lib/utils/cookie/cookie";
import {
	ACCESS_TOKEN,
	ACCESS_TOKEN_EXPIRES_MINUTES,
	REFRESH_TOKEN,
	REFRESH_TOKEN_EXPIRES_DAYS,
	USER,
} from "@/shared/constants/tokens";

interface AuthFormProps {
	type: "login" | "register";
}

const getPasswordLevel = (password: string): 0 | 1 | 2 | 3 => {
	if (password.length === 0) return 0;

	const hasLower = /[a-z]/.test(password);
	const hasUpper = /[A-Z]/.test(password);
	const hasDigit = /\d/.test(password);
	const hasSpecial = /[^A-Za-z0-9]/.test(password);

	if (password.length >= 10 && hasLower && hasUpper && hasDigit && hasSpecial) return 3;
	if (password.length >= 8 && (hasLower || hasUpper) && hasDigit) return 2;
	if (password.length >= 6) return 1;

	return 0;
};

export const AuthForm: FC<AuthFormProps> = ({ type }) => {
	const t = useTranslations();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordLevel, setPasswordLevel] = useState<0 | 1 | 2 | 3>(0);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onLogin = async () => {
		if (!email || !password) {
			addToast({ title: t("no email or password") });
			return;
		}

		if (!isEmail(email)) {
			addToast({ title: t("wrong email"), description: t("type right email") });
			return;
		}

		try {
			setIsLoading(true);
			const res = await $fetch<false>(type === "login" ? `/auth/login` : `/auth/register`, {
				method: "POST",
				data: { email, password },
			});

			if (res.status === 200) {
				if (type === "login") {
					CookieManager.set(ACCESS_TOKEN, res.data.access_token, {
						secure: process.env.NODE_ENV === "production",
						sameSite: "Strict",
						expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRES_MINUTES * 60 * 1000),
						path: "/",
					});
					CookieManager.set(REFRESH_TOKEN, res.data.refresh_token, {
						secure: process.env.NODE_ENV === "production",
						sameSite: "Strict",
						expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
						path: "/",
					});
					const user = await $fetch<false>("/auth/me", {
						headers: { Authorization: `Bearer ${res.data.access_token}` },
					});
					CookieManager.set(USER, JSON.stringify(user.data), {
						secure: process.env.NODE_ENV === "production",
						sameSite: "Strict",
						expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
						path: "/",
					});
					router.push("/");
				} else {
					router.push("/register/email");
				}
				return;
			} else {
				addToast({ color: "danger", title: t("exist account") });
			}
		} catch (e) {
			console.error(e);
			addToast({ color: "danger", title: t("wrong password or email") });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className="flex flex-col gap-2 w-full">
			<Input
				required
				className="w-full"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				label={t("email")}
				name="email"
				id="email"
				type="email"
			/>
			<Input
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
					setPasswordLevel(getPasswordLevel(e.target.value));
				}}
				required
				className="w-full"
				label={t("password")}
				name="password"
				id="password"
				type="password"
			/>

			{type === "register" && (
				<div className="w-full mt-1 space-y-1">
					<div className="flex gap-1 h-2">
						<div className={`w-1/3 rounded-full transition-all ${passwordLevel >= 1 ? "bg-red-500" : "bg-gray-200"}`} />
						<div
							className={`w-1/3 rounded-full transition-all ${passwordLevel >= 2 ? "bg-yellow-500" : "bg-gray-200"}`}
						/>
						<div
							className={`w-1/3 rounded-full transition-all ${passwordLevel >= 3 ? "bg-green-500" : "bg-gray-200"}`}
						/>
					</div>
					<p className="text-xs text-gray-500">
						{passwordLevel === 0 && t("enter password")}
						{passwordLevel === 1 && t("weak")}
						{passwordLevel === 2 && t("medium")}
						{passwordLevel === 3 && t("strong")}
					</p>
				</div>
			)}

			<Button
				isLoading={isLoading}
				onPress={onLogin}
				color="primary"
				className="w-full mt-2"
				type="submit"
				isDisabled={type === "register" && passwordLevel < 2}
			>
				{t(type === "login" ? "sign in" : "sign up")}
			</Button>
			{type === "login" && <Link href="/password/forgot">Забыли пароль?</Link>}
		</form>
	);
};
