import { cookies } from "next/headers";
import { DeadlinePageContent } from "./content";
import { $fetch } from "@/fetch";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { Deadline } from "@/entities/deadlines/model/types/Deadline";
import moment from "moment";

export default async function DeadlinesPage() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN);
	let deadlines: Deadline[] = [];

	try {
		const res = await $fetch("/deadlines/me", { headers: { Authorization: `Bearer ${accessToken?.value}` } });
		if (!res.ok) {
			throw new Error(JSON.stringify(await res.text()) + res.status);
		}
		deadlines = (await res.json()) || [];
	} catch (e) {
		console.log(e);
		deadlines = [];
	}

	return (
		<DeadlinePageContent
			deadlines={deadlines.map(({ date_to, date_from, ...other }) => ({
				...other,
				date_to: moment(date_to).add(3, "hours").toISOString(),
				date_from: date_from ? moment(date_from).add(3, "hours").toISOString() : undefined,
			}))}
		/>
	);
}
