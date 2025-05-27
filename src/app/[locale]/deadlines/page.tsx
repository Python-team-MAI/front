import { cookies } from "next/headers";
import { DeadlinePageContent } from "./content";
import { $fetch } from "@/fetch";
import { ACCESS_TOKEN } from "@/shared/constants/tokens";
import { Deadline } from "@/entities/deadlines/model/types/Deadline";
import moment from "moment";

export default async function DeadlinesPage() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN);
	const res = await $fetch("/deadlines", { headers: { Authorization: `Bearer ${accessToken}` } });
	const deadlines: Deadline[] = (await res.json()) || [];

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
