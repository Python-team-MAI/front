"use client";

import { usePathname } from "@/entities/i18n/routing";
import { ShortHeader } from "./components/ShortHeader";
import { TabBar } from "./components/TabBar";
import { LongHeader } from "./components/LongHeader";
import { FC } from "react";
import { ShortestHeader } from "./components/ShortestHeader";
import { notAuthRoutes } from "@/middleware";

interface HeaderProps {
	isShort?: boolean;
}

export const Header: FC<HeaderProps> = ({ isShort }) => {
	const pathname = usePathname();

	if (isShort) {
		return <ShortestHeader />;
	}

	if (notAuthRoutes.includes(pathname)) {
		return <ShortHeader />;
	}

	return (
		<>
			<LongHeader />
			<TabBar />
		</>
	);
};
