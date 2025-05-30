import { Locale } from "@/entities/i18n/routing";
import { CardProps, MainCard, SecondaryCard, BigCard } from "@/entities/main";
import { TgBanner } from "@/features/TgBanner";
import { getTranslations } from "next-intl/server";

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

const bigCards = [
	{
		src: "/icons/map.svg",
		alt: "map",
		text: "main map",
		secondaryText: "main map",
		href: "/map?floor=2",
	},
	{
		src: "/icons/tree.svg",
		alt: "tree",
		text: "recreation",
		secondaryText: "health edu centers",
		href: "",
	},
	{
		src: "/icons/room.svg",
		alt: "room",
		text: "uni campus",
		secondaryText: "dormitories",
		href: "",
	},
];

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
				{bigCards.map((card) => (
					<BigCard
						href={card.href}
						src={card.src}
						alt={card.alt}
						text={t(card.text)}
						secondaryText={t(card.secondaryText)}
						locale={locale}
						key={card.src}
					/>
				))}
			</section>
		</main>
	);
}
