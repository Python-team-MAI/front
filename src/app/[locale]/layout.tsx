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

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				{/* <meta
					httpEquiv="Content-Security-Policy"
					content="default-src 'self' http: https: data: 'unsafe-inline' 'unsafe-eval'; connect-src 'self' http: https: ws: wss:; worker-src 'self' blob:;"
				/> */}
			</head>
			<body className={`${roboto.className} antialiased`}>
				<Providers locale={locale} messages={messages}>
					<Header />
					<div className="px-[10vw] max-md:px-2">{children}</div>
				</Providers>
				<AssistantButton />
			</body>
		</html>
	);
}
