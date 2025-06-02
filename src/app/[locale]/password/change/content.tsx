"use client";

import { getPasswordLevel } from "@/entities/auth/ui/AuthForm";
import { $fetch } from "@/fetch";
import { useRouter } from "@/navigation";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "@/shared/constants/tokens";
import { CookieManager } from "@/shared/lib/utils/cookie/cookie";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/react";
import { useTranslations } from "next-intl";
import React, { FC, useState } from "react";

interface ChangePasswordContentProps {
	accessToken: string;
	token: string;
}

export const ChangePasswordContent: FC<ChangePasswordContentProps> = ({ accessToken, token }) => {
	const t = useTranslations();
	const router = useRouter();
	const [passwordLevel, setPasswordLevel] = useState<0 | 1 | 2 | 3>(0);
	const [password, setPassword] = useState<string>();
	const [password1, setPassword1] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async () => {
		if (password !== password1) {
			addToast({ title: "Ошибка!", description: "Пароли не совпадают", color: "danger" });
			return;
		}

		let isGood = false;

		try {
			setIsLoading(true);
			const res = await $fetch<false>("/auth/password-reset-confirm/" + token, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					new_password: password,
					confirm_new_password: password1,
				},
			});

			console.log(res.data);

			if (res.status >= 200 && res.status < 300) {
				isGood = true;
			}
		} catch (e) {
			console.log("error", e);
			addToast({ title: "Ошибка!", color: "danger" });
		} finally {
			setPassword("");
			setPassword1("");
			setIsLoading(false);
			if (isGood) {
				CookieManager.remove(ACCESS_TOKEN);
				CookieManager.remove(REFRESH_TOKEN);
				CookieManager.remove(USER);

				router.replace("/login");
			}
		}
	};

	return (
		<div className="flex py-28 flex-col justify-center items-center">
			<div className="w-1/2 flex flex-col gap-3">
				<h1 className="text-3xl">Введите свой email</h1>
				<Input
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						setPasswordLevel(getPasswordLevel(e.target.value));
					}}
					type="password"
					label="Пароль"
					name="password"
					required
				/>
				<Input
					value={password1}
					onChange={(e) => {
						setPassword1(e.target.value);
					}}
					type="password"
					label="Пароль снова"
					name="password_confirm"
					required
				/>
				{
					<div className="w-full mt-1 space-y-1">
						<div className="flex gap-1 h-2">
							<div
								className={`w-1/3 rounded-full transition-all ${passwordLevel >= 1 ? "bg-red-500" : "bg-gray-200"}`}
							/>
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
				}

				<Button isDisabled={passwordLevel < 2} color="primary" isLoading={isLoading} onPress={onSubmit}>
					Отправить
				</Button>
			</div>
		</div>
	);
};
