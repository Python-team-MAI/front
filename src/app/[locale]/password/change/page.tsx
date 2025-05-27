import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import React from "react";
import { $fetch } from "@/fetch";
import { Locale, redirect } from "@/navigation";

const ForgotPasswordPage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ locale: Locale }>;
	searchParams: Promise<{ token: string }>;
}) => {
	const { locale } = await params;
	const { token } = await searchParams;

	const onSubmit: (formData: FormData) => void | Promise<void> = async (formData) => {
		"use server";
		const password = formData.get("password");
		const passwordConfirm = formData.get("password_confirm");

		if (password !== passwordConfirm) {
			return;
		}

		const res = await $fetch("/auth/password-reset-confirm/" + token, {
			method: "POST",
			body: JSON.stringify({
				new_password: password,
				confirm_new_password: passwordConfirm,
			}),
		});

		if (res.ok) {
			redirect({ href: "/ru/login", locale });
		}
	};

	return (
		<div className="h-[80vw] flex flex-col justify-center items-center">
			<form className="w-1/2 flex flex-col gap-3" action={onSubmit}>
				<h1 className="text-3xl">Введите свой email</h1>
				<Input type="password" label="Пароль" name="password" required />
				<Input type="password" label="Пароль снова" name="password_confirm" required />
				<Button type="submit">Отправить</Button>
			</form>
		</div>
	);
};

export default ForgotPasswordPage;
