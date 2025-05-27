interface CookieOptions {
	expires?: Date | string | number;
	path?: string;
	domain?: string;
	secure?: boolean;
	sameSite?: "Strict" | "Lax" | "None";
}

export class CookieManager {
	// CookieManager implementation fix

	// CookieManager implementation fix

	// For the set method
	static set(name: string, value: string, options: CookieOptions = {}): void {
		// Encode both name and value properly
		const encodedName = encodeURIComponent(name);
		const encodedValue = encodeURIComponent(value);

		let cookieString = `${encodedName}=${encodedValue}`;

		// Add options to cookie string
		if (options.expires) {
			let expirationDate: Date;

			if (options.expires instanceof Date) {
				expirationDate = options.expires;
			} else if (typeof options.expires === "number") {
				// For number of days
				expirationDate = new Date();
				// This will trigger the Date.prototype.setTime method
				expirationDate.setTime(expirationDate.getTime() + options.expires * 24 * 60 * 60 * 1000);
			} else {
				expirationDate = new Date(options.expires);
			}

			cookieString += `; expires=${expirationDate.toUTCString()}`;
		}

		if (options.path) {
			cookieString += `; path=${options.path}`;
		}

		if (options.domain) {
			cookieString += `; domain=${options.domain}`;
		}

		if (options.secure) {
			cookieString += "; secure";
		}

		if (options.sameSite) {
			cookieString += `; samesite=${options.sameSite}`;
		}

		// Directly set document.cookie
		document.cookie = cookieString;
	}

	// For the getAll method
	static getAll(): Record<string, string> {
		const cookies: Record<string, string> = {};
		const cookieString = document.cookie;

		// If cookie string is empty, return empty object
		if (!cookieString) {
			return cookies;
		}

		const pairs = cookieString.split("; ");
		for (const pair of pairs) {
			const [name, value] = pair.split("=");
			// Only add valid cookie pairs
			if (name && name.trim()) {
				cookies[decodeURIComponent(name)] = decodeURIComponent(value || "");
			}
		}

		return cookies;
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
}
