import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import React from "react";
import { $fetch } from "@/fetch";
import { Locale, redirect } from "@/navigation";

const ForgotPasswordPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params;

	const onSubmit: (formData: FormData) => void | Promise<void> = async (formData) => {
		"use server";
		const email = formData.get("email");

		const res = await $fetch("/auth/password-reset-request", {
			method: "POST",
			body: JSON.stringify({
				email,
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
				<Input type="email" label="Эл. почта" name="email" required />
				<Button type="submit">Отправить</Button>
			</form>
		</div>
	);
};

export default ForgotPasswordPage;
