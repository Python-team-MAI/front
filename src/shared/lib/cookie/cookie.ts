export class CookieManager {
	static set(
		name: string,
		value: string,
		options: {
			expires?: Date | number | string;
			path?: string;
			domain?: string;
			secure?: boolean;
			sameSite?: "Strict" | "Lax" | "None";
		} = {}
	): void {
		let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

		if (options.expires) {
			if (typeof options.expires === "number") {
				const date = new Date();
				date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
				cookie += `; expires=${date.toUTCString()}`;
			} else if (options.expires instanceof Date) {
				cookie += `; expires=${options.expires.toUTCString()}`;
			} else {
				cookie += `; expires=${options.expires}`;
			}
		}

		if (options.path) {
			cookie += `; path=${options.path}`;
		}

		if (options.domain) {
			cookie += `; domain=${options.domain}`;
		}

		if (options.secure) {
			cookie += "; secure";
		}

		if (options.sameSite) {
			cookie += `; samesite=${options.sameSite}`;
		}

		document.cookie = cookie;
	}

	static get(name: string): string | null {
		const cookies = document.cookie.split(";");
		for (const cookie of cookies) {
			const [cookieName, cookieValue] = cookie.trim().split("=");
			if (decodeURIComponent(cookieName) === name) {
				return decodeURIComponent(cookieValue);
			}
		}
		return null;
	}

	static remove(name: string, path?: string, domain?: string): void {
		this.set(name, "", {
			expires: new Date(0),
			path,
			domain,
		});
	}

	static has(name: string): boolean {
		return this.get(name) !== null;
	}

	static getAll(): Record<string, string> {
		const cookies: Record<string, string> = {};
		document.cookie.split(";").forEach((cookie) => {
			const [name, value] = cookie.trim().split("=");
			cookies[decodeURIComponent(name)] = decodeURIComponent(value);
		});
		return cookies;
	}
}
