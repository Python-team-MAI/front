import { Locale, redirect } from "@/entities/i18n/routing";
import { CardProps, MainCard, SecondaryCard } from "@/entities/main";
import { TgBanner } from "@/features/TgBanner";
import { Button } from "@heroui/button";
import { Card, CardHeader } from "@heroui/card";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const mainCards: CardProps[] = [
	{
		src: "/icons/safe.svg",
		alt: "safe",
		text: "payment",
		href: "",
	},
	{
		src: "/icons/laptop.svg",
		alt: "laptop",
		text: "lms",
		href: "",
	},
	{
		src: "/icons/notepad.svg",
		alt: "notepad",
		text: "admission",
		href: "",
	},
	{
		src: "/icons/student.svg",
		alt: "student",
		text: "account",
		href: "",
	},
];

const secondaryCards: CardProps[] = [
	{
		src: "/icons/teacher.svg",
		alt: "teacher",
		text: "teachers",
		href: "",
	},
	{
		src: "/icons/burger_king.svg",
		alt: "burger_king",
		text: "food",
		href: "",
	},
	{
		src: "/icons/sport.svg",
		alt: "sport",
		text: "sport",
		href: "",
	},
	{
		src: "/icons/news.svg",
		alt: "news",
		text: "news",
		href: "",
	},
];

// const bigCards: CardProps[] = [];

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await params;
	const t = await getTranslations();
	const randomNumber = Math.random();

	return (
		<main className="p-2">
			<section className={`grid max-md:grid-cols-2 ${randomNumber > 0.5 ? "grid-cols-5" : "grid-cols-4"} gap-2`}>
				{mainCards.map((card) => (
					<MainCard href={card.href} src={card.src} alt={card.alt} text={t(card.text)} key={card.src} />
				))}
				{randomNumber > 0.5 && <TgBanner />}
			</section>
			<section className="flex justify-center gap-2 m-4">
				{secondaryCards.map((card) => (
					<SecondaryCard href={card.href} src={card.src} alt={card.alt} text={t(card.text)} key={card.src} />
				))}
			</section>
			<section className="mt-2 flex flex-col gap-2 md:m-7">
				<Card>
					<CardHeader className="flex gap-3">
						<Image className="max-md:w-13" unoptimized alt="safe" src={"/icons/map.svg"} width={100} height={100} />
						<div className="flex flex-col">
							<p className="text-md">{t("main map")}</p>
							<p className="text-small text-default-500">{t("main map")}</p>
						</div>
						<Button
							onPress={async () => {
								"use server";
								redirect({ href: "/map?floor=2", locale });
							}}
							size="lg"
							variant="shadow"
							isIconOnly
							color="primary"
							className="ml-auto"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="white" viewBox="0 0 24 24">
								<path
									stroke="white"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 12h12m0 0-5-5m5 5-5 5"
								/>
							</svg>
						</Button>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="flex gap-3">
						<Image className="max-md:w-13" unoptimized alt="safe" src={"/icons/tree.svg"} width={100} height={100} />
						<div className="flex flex-col">
							<p className="text-md">{t("recreation")}</p>
							<p className="text-small text-default-500">{t("health edu centers")}</p>
						</div>
						<Button size="lg" variant="shadow" isIconOnly color="primary" className="ml-auto">
							<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="white" viewBox="0 0 24 24">
								<path
									stroke="white"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 12h12m0 0-5-5m5 5-5 5"
								/>
							</svg>
						</Button>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="flex gap-3">
						<Image className="max-md:w-13" unoptimized alt="safe" src={"/icons/room.svg"} width={100} height={100} />
						<div className="flex flex-col">
							<p className="text-md">{t("uni campus")}</p>
							<p className="text-small text-default-500">{t("dormitories")}</p>
						</div>
						<Button size="lg" variant="shadow" isIconOnly color="primary" className="ml-auto">
							<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="white" viewBox="0 0 24 24">
								<path
									stroke="white"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 12h12m0 0-5-5m5 5-5 5"
								/>
							</svg>
						</Button>
					</CardHeader>
				</Card>
			</section>
		</main>
	);
}
