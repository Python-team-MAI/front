import { Deadline } from "@/entities/deadlines/model/types/Deadline";

export const groupDeadlinesByDay = (deadlines: Deadline[]) => {
	const groups: { [key: string]: Deadline[] } = {};

	deadlines.forEach((deadline) => {
		const dateKey = deadline.date_to;
		if (!groups[dateKey]) {
			groups[dateKey] = [];
		}
		groups[dateKey].push(deadline);
	});

	return Object.entries(groups).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime());
};
