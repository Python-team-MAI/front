import { $fetch } from "@/fetch";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { cookies } from "next/headers";
import React from "react";
import { User } from "@/entities/user";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Card } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { RxAvatar } from "react-icons/rx";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { redirect } from "@/navigation";

const Profile = async ({ params }: { params: Promise<{ locale: string }> }) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
	const res = await $fetch("/auth/me", { headers: { Authorization: `Bearer ${accessToken}` } });
	const user: User = await res.json();
	const { locale } = await params;
	const t = await getTranslations({ locale });

	if (!user) {
		notFound();
	}

	const onSubmit = async (data: FormData) => {
		"use server";
		const email = data.get("email");

		try {
			const res = await $fetch("/auth/password-reset-request", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ email }),
			});

			console.log(await res.json(), res.status);

			if (res.ok) {
				redirect({ href: "/change-password/email", locale });
			}
		} catch (e) {
			console.log(e);
		}
	};

	const { bio, email, first_name, last_name, role } = user;

	return (
		<main className="max-w-6xl mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-1">
					<Card className="p-6 h-full">
						<div className="flex flex-col items-center space-y-4">
							<Button
								onPress={async () => {
									"use server";
									redirect({ href: "/profile", locale });
								}}
								className="mr-4 self-start"
							>
								← {t("back")}
							</Button>
							<div className="relative">
								<Avatar className="w-32 h-32 rounded-full border-4 border-white shadow">
									{first_name && last_name ? (
										<span className="text-2xl font-bold">
											{first_name[0]}
											{last_name[0]}
										</span>
									) : (
										<RxAvatar className="w-full h-full text-[--foreground]" />
									)}
								</Avatar>
							</div>

							<div className="text-center">
								<h1 className="text-2xl font-bold">
									{first_name} {last_name}
								</h1>
								<p className="text-gray-500">{email}</p>
								<div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
									{t(role)}
								</div>
							</div>

							{bio && (
								<div className="w-full mt-4">
									<h2 className="text-lg font-semibold mb-2">{t("bio")}</h2>
									<p className="text-gray-700">{bio}</p>
								</div>
							)}
						</div>
					</Card>
				</div>

				<div className="md:col-span-2">
					<Card className="p-6 h-full">
						<h2 className="text-xl font-bold mb-6 border-b pb-3">{t("change password")}</h2>
						<form className="flex flex-col gap-2" action={onSubmit}>
							<Input required isRequired label={t("email")} name="email" />
							<Button color="primary" type="submit">
								Отправить
							</Button>
						</form>
					</Card>
				</div>
			</div>
		</main>
	);
};

export default Profile;
