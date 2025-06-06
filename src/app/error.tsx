"use client";

import { routing, useRouter } from "@/navigation";
import { Providers } from "./[locale]/providers";
import "./[locale]/globals.css";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import Image from "next/image";
import { Button } from "@heroui/button";

const messages = {
	"logo title": "МАИ (Студенты)",
};

const NotFound = (e: object) => {
	const router = useRouter();

	console.log(e);

	return (
		<html lang={routing.defaultLocale}>
			<body className={`antialiased dark`}>
				<Providers locale={routing.defaultLocale} messages={messages}>
					<Navbar shouldHideOnScroll>
						<NavbarBrand className="cursor-pointer">
							<Image width={70} height={70} className="max-md:hidden" src={"/logo/light_logo.png"} alt="logo" />
							<p className="font-bold text-inherit">МАИ (Студенты)</p>
						</NavbarBrand>
						<NavbarContent justify="end"></NavbarContent>
					</Navbar>
					<div className="px-[10vw] max-md:px-2">
						<div className="flex flex-col gap-3 justify-center items-center my-44 p-5 border rounded-lg">
							<p className="text-2xl text-center font-bold">Ошибка: Наша ошибка, простите</p>
							<p className="text-xl text-center">Простите, вы перешли на несуществующую страницу</p>

							<div className="flex w-full justify-evenly gap-3 items-center">
								<Button size="lg" onPress={() => router.replace("/")} fullWidth>
									На главную
								</Button>
							</div>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
};

export default NotFound;
