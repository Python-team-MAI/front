import { addDays, isAfter, parseISO } from "date-fns";

export const getDeadlineStatus = (dateTo: string) => {
	const deadline = parseISO(dateTo);
	const today = new Date();

	if (isAfter(deadline, addDays(today, 7))) {
		return { status: "Upcoming", color: "bg-blue-100 text-blue-800" };
	} else if (isAfter(deadline, addDays(today, 3))) {
		return { status: "This Week", color: "bg-purple-100 text-purple-800" };
	} else if (isAfter(deadline, today)) {
		return { status: "Soon", color: "bg-amber-100 text-amber-800" };
	} else {
		return { status: "Overdue", color: "bg-red-100 text-red-800" };
	}
};
