import { cookies } from "next/headers";
import { DeadlinePageContent } from "./content";
import { $fetch } from "@/fetch";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";

export default async function DeadlinesPage() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN);
	const res = await $fetch("/deadlines", { headers: { Authorization: `Bearer ${accessToken}` } });
	const deadlines = (await res.json()) || [];

	console.log(deadlines);

	return <DeadlinePageContent deadlines={deadlines} />;
}
