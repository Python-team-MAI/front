"use client";

import { Locale } from "@/entities/i18n/routing";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

export function Providers({
	children,
	messages,
	locale,
}: {
	children: React.ReactNode;
	messages: AbstractIntlMessages;
	locale: Locale;
}) {
	return (
		<NextIntlClientProvider timeZone="Europe/Moscow" locale={locale} messages={messages}>
			<HeroUIProvider className="min-h-[100vh]">
				<ThemeProvider defaultTheme="dark" attribute="data-theme" disableTransitionOnChange>
					<ToastProvider />
					{children}
				</ThemeProvider>
			</HeroUIProvider>
		</NextIntlClientProvider>
	);
}
