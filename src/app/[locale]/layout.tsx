import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/entities/i18n/routing";
import { Header } from "@/widgets/Header";
import { Providers } from "./providers";
import "./globals.css";
import { AssistantButton } from "@/widgets/assistant";

const roboto = Roboto({ subsets: ["cyrillic", "latin"], weight: ["500", "700", "900"], display: "swap" });

export const metadata: Metadata = {
	title: "MAI Students",
	description: "From MAI Student for MAI Students",
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: Locale }>;
}>) {
	const { locale } = await params;

	if (!routing.locales.includes(locale)) {
		notFound();
	}

	const messages = await getMessages({ locale });
	console.log(messages);

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${roboto.className} antialiased`}>
				<Providers locale={locale} messages={messages}>
					<Header />
					<main className="px-[10vw] max-md:px-2">{children}</main>
					<AssistantButton />
				</Providers>
			</body>
		</html>
	);
}
