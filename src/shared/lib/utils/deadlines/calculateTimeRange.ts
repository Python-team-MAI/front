import { Deadline } from "@/entities/deadlines/model/types/Deadline";
import { parseISO } from "date-fns";

export const calculateTimeRange = (deadlines: Deadline[]) => {
	let minDate = new Date();
	let maxDate = new Date();

	deadlines.forEach((deadline) => {
		const endDate = parseISO(deadline.date_to);
		const startDate = deadline.date_from ? parseISO(deadline.date_from) : endDate;

		if (startDate < minDate) minDate = startDate;
		if (endDate > maxDate) maxDate = endDate;
	});

	// Add some padding
	minDate.setDate(minDate.getDate() - 2);
	maxDate.setDate(maxDate.getDate() + 2);

	return { minDate, maxDate };
};
