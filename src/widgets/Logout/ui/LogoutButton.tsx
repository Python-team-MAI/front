"use client";

import { useRouter } from "@/navigation";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "@/shared/constants/tokens";
import { CookieManager } from "@/shared/lib/utils/cookie/cookie";
import { Button } from "@heroui/button";
import { LogOut } from "lucide-react";
import React from "react";

export const LogoutButton = () => {
	const router = useRouter();

	const logout = () => {
		CookieManager.remove(USER);
		CookieManager.remove(ACCESS_TOKEN);
		CookieManager.remove(REFRESH_TOKEN);

		router.push("/login");
		router.refresh();
	};

	return (
		<Button size="sm" onPress={logout}>
			<LogOut />
		</Button>
	);
};
