export const getInitials = (name?: string) => {
	if (!name) return "??";
	const splitted_fio = name.split(" ");

	if (splitted_fio.length === 1) {
		return splitted_fio?.[0][0];
	}

	if (splitted_fio.length === 2) {
		return `${splitted_fio?.[0][0] || ""}${splitted_fio?.[1][0] || ""}`;
	}

	return `${splitted_fio?.[0][0] || ""}${splitted_fio?.[1][0] || ""}`;
};
