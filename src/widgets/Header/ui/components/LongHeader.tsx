"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Image from "next/image";
import { Link, useRouter } from "@/navigation";
import moment from "moment";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";
import { LanguageSwitcher } from "@/widgets/LanguageSwitcher";
import { ProfileButton } from "@/widgets/ProfileButton";
import { useTranslations } from "next-intl";
import { LogoutButton } from "@/widgets/Logout";
import { Drawer, DrawerBody, DrawerContent } from "@heroui/drawer";
import { ChartNoAxesGantt, Home, Lock, Map, Menu, MessageSquare, Table } from "lucide-react";
import { useState } from "react";
import { TgBanner } from "@/features/TgBanner";
import { jwtDecode } from "jwt-decode";
import { CookieManager } from "@/shared/lib/utils/cookie/cookie";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { User } from "@/entities/user";

export const LongHeader = ({}) => {
	const router = useRouter();
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState(false);
	const accessToken = CookieManager.get(ACCESS_TOKEN);
	const decoded = jwtDecode<User>(accessToken!);

	return (
		<>
			<Drawer isOpen={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
				<DrawerContent>
					<DrawerBody className="py-10">
						<Link onClick={() => setIsOpen(false)} href="/" className="flex gap-2 items-centers">
							<Home size={24} className="flex justify-center items-center" />
							<p className="text-xl">{t("main")}</p>
						</Link>
						<Link
							onClick={() => setIsOpen(false)}
							href={`/schedule?date=${moment().format("DD.MM.YYYY")}&group=М8О-101БВ-24`}
							className="flex gap-2 items-centers"
						>
							<Table size={24} className="flex justify-center items-center" />
							<p className="text-xl">{t("schedule")}</p>
						</Link>
						<Link onClick={() => setIsOpen(false)} href="/deadlines" className="flex gap-2 items-centers">
							<ChartNoAxesGantt size={24} className="flex justify-center items-center" />
							<p className="text-xl">{t("deadlines")}</p>
						</Link>
						<Link onClick={() => setIsOpen(false)} href="/map?floor=4" className="flex gap-2 items-centers">
							<Map size={24} className="flex justify-center items-center" />
							<p className="text-xl">{t("map")}</p>
						</Link>
						<Link onClick={() => setIsOpen(false)} href="/chat" className="flex gap-2 items-centers">
							<MessageSquare size={24} className="flex justify-center items-center" />
							<p className="text-xl">{t("chat")}</p>
						</Link>
						{decoded.role === "admin" && (
							<Link onClick={() => setIsOpen(false)} href="/admin" className="flex gap-2 items-centers">
								<Lock size={24} className="flex justify-center items-center" />
								<p className="text-xl">{t("admin")}</p>
							</Link>
						)}
						<TgBanner />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<Navbar shouldHideOnScroll>
				<NavbarBrand onClick={() => router.push("/")} className="cursor-pointer">
					<Image width={70} height={70} className="max-md:hidden" src={"/logo/light_logo.png"} alt="logo" />
					<p className="font-bold text-inherit">{t("logo title")}</p>
				</NavbarBrand>
				<NavbarContent justify="end" className="flex gap-2">
					<NavbarItem>
						<ThemeSwitcher />
					</NavbarItem>
					<NavbarItem>
						<LanguageSwitcher />
					</NavbarItem>
					<NavbarItem>
						<ProfileButton />
					</NavbarItem>
					<NavbarItem className="cursor-pointer" onClick={() => setIsOpen(true)}>
						<Menu />
					</NavbarItem>
					<NavbarItem>
						<LogoutButton />
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</>
	);
};
