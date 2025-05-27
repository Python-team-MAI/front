import { Deadline } from "@/entities/deadlines/model/types/Deadline";
import moment, { Moment } from "moment";

export const countDeadlinesForDate = (deadlines: Deadline[], targetDate: Moment): [number, Deadline[]] => {
	const filtered = deadlines.filter((deadline) => {
		const end = moment(deadline.date_to, "YYYY-MM-DD");
		const start = deadline.date_from ? moment(deadline.date_from, "YYYY-MM-DD") : end;

		return targetDate.isBetween(start, end, null, "[]");
	});
	return [filtered.length, filtered];
};
