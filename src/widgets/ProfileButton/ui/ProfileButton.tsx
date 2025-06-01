"use client";

import { Button } from "@heroui/button";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export const ProfileButton = ({}) => {
	const router = useRouter();
	const t = useTranslations();

	return (
		<Button className="hidden sm:block" size="sm" onPress={() => router.push("/profile")}>
			{t("profile")}
		</Button>
	);
};
