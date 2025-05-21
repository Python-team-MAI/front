export class CookieManager {
	/**
	 * Устанавливает cookie
	 * @param name - Имя cookie
	 * @param value - Значение cookie
	 * @param options - Дополнительные параметры (expires, path, domain, secure, sameSite)
	 */
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

	/**
	 * Получает значение cookie по имени
	 * @param name - Имя cookie
	 * @returns Значение cookie или null, если cookie не найдена
	 */
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

	/**
	 * Удаляет cookie по имени
	 * @param name - Имя cookie
	 * @param path - Путь cookie (должен совпадать с путем при установке)
	 * @param domain - Домен cookie (должен совпадать с доменом при установке)
	 */
	static remove(name: string, path?: string, domain?: string): void {
		this.set(name, "", {
			expires: new Date(0),
			path,
			domain,
		});
	}

	/**
	 * Проверяет существование cookie
	 * @param name - Имя cookie
	 * @returns true, если cookie существует, иначе false
	 */
	static has(name: string): boolean {
		return this.get(name) !== null;
	}

	/**
	 * Возвращает все cookies в виде объекта
	 * @returns Объект с парами имя-значение всех cookies
	 */
	static getAll(): Record<string, string> {
		const cookies: Record<string, string> = {};
		document.cookie.split(";").forEach((cookie) => {
			const [name, value] = cookie.trim().split("=");
			cookies[decodeURIComponent(name)] = decodeURIComponent(value);
		});
		return cookies;
	}
}
