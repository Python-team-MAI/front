import { AuthForm } from "@/entities/auth";
import { Locale, redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";

const TgAuthPage = async ({
	searchParams,
	params,
}: {
	searchParams: Promise<{ tg_id: string }>;
	params: Promise<{ locale: Locale }>;
}) => {
	const { tg_id } = await searchParams;
	const { locale } = await params;
	const t = await getTranslations({ locale });

	if (!tg_id) {
		redirect({ locale, href: "/login" });
	}

	return (
		<main className="min-h-screen flex flex-col justify-center items-center">
			<div className="flex flex-col gap-5 justify-center items-stretch w-1/4 max-md:w-1/2">
				<h1 className="text-2xl text-center">{t("login")}</h1>
				<AuthForm type="tg" tg_id={tg_id} />
			</div>
		</main>
	);
};

export default TgAuthPage;
