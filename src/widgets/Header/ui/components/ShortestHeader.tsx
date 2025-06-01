import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

export const ShortestHeader = () => {
	const t = useTranslations();
	const router = useRouter();

	return (
		<Navbar shouldHideOnScroll>
			<NavbarBrand className="cursor-pointer" onClick={() => router.replace("/")}>
				<Image width={70} height={70} className="max-md:hidden" src={"/logo/light_logo.png"} alt="logo" />
				<p className="font-bold text-inherit">{t("logo title")}</p>
			</NavbarBrand>
			<NavbarContent justify="end"></NavbarContent>
		</Navbar>
	);
};
