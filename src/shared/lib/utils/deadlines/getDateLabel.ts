import { format, isSameWeek, isToday, isTomorrow, parseISO } from "date-fns";

export const getDateLabel = (dateString: string) => {
	const date = parseISO(dateString);

	if (isToday(date)) return "Today";
	if (isTomorrow(date)) return "Tomorrow";
	if (isSameWeek(date, new Date(), { weekStartsOn: 1 })) {
		return format(date, "EEEE"); // Day name
	}

	return format(date, "MMM d, yyyy");
};
