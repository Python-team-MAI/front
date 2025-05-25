export const checkLocale = (pathname: string) => {
	switch (pathname.slice(0, 4)) {
		case "/ru":
			return "ru";
		case "/en":
			return "en";
		case "/ch":
			return "ch";
		case "/ru/":
			return "ru";
		case "/en/":
			return "en";
		case "/ch/":
			return "ch";
		default:
			return "ru";
	}
};
