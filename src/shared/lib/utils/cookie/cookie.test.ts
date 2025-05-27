import { CookieManager } from "./cookie";

describe("CookieManager", () => {
	// Mock document.cookie
	let documentCookies: string[] = [];
	let cookieSetter: jest.SpyInstance;

	// Store the original document.cookie property descriptor
	const originalDocumentCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");

	beforeAll(() => {
		// Mock document.cookie getter and setter
		Object.defineProperty(document, "cookie", {
			get: jest.fn(() => documentCookies.join("; ")),
			set: jest.fn((value: string) => {
				// When a cookie is set, parse it and add/update it in the array
				const cookieParts = value.split(";")[0].split("=");
				const name = decodeURIComponent(cookieParts[0].trim());
				const cookieValue = decodeURIComponent(cookieParts[1].trim());

				// Remove existing cookie with the same name if it exists
				documentCookies = documentCookies.filter((cookie) => {
					return !cookie.startsWith(`${name}=`);
				});

				// If it's not an expired cookie (checking for past date)
				if (!value.includes("expires=Thu, 01 Jan 1970")) {
					documentCookies.push(`${name}=${cookieValue}`);
				}
			}),
			configurable: true,
		});

		// Create a spy on the setter
		cookieSetter = jest.spyOn(document, "cookie", "set");
	});

	afterAll(() => {
		// Restore original document.cookie
		if (originalDocumentCookieDescriptor) {
			Object.defineProperty(Document.prototype, "cookie", originalDocumentCookieDescriptor);
		}
		cookieSetter.mockRestore();
	});

	beforeEach(() => {
		// Clear cookies before each test
		documentCookies = [];
		cookieSetter.mockClear();
	});

	describe("set", () => {
		test("should set a basic cookie", () => {
			CookieManager.set("name", "value");
			expect(document.cookie).toContain("name=value");
		});

		test("should set cookie with expiration date as Date object", () => {
			const date = new Date("2030-01-01");
			CookieManager.set("name", "value", { expires: date });
			expect(cookieSetter).toHaveBeenCalledWith(expect.stringContaining(`expires=${date.toUTCString()}`));
		});

		test("should set cookie with expiration days as number", () => {
			jest.spyOn(Date.prototype, "setTime");
			CookieManager.set("name", "value", { expires: 7 });
			expect(Date.prototype.setTime).toHaveBeenCalled();
			expect(cookieSetter).toHaveBeenCalledWith(expect.stringContaining("expires="));
		});

		test("should set cookie with expiration as string", () => {
			const expiresString = "Wed, 31 Dec 2025 23:59:59 GMT";
			CookieManager.set("name", "value", { expires: expiresString });
			expect(cookieSetter).toHaveBeenCalledWith(expect.stringContaining(`expires=${expiresString}`));
		});

		test("should set cookie with path", () => {
			CookieManager.set("name", "value", { path: "/test" });
			expect(cookieSetter).toHaveBeenCalledWith(expect.stringContaining("path=/test"));
		});

		test("should set cookie with domain", () => {
			CookieManager.set("name", "value", { domain: "example.com" });
			expect(cookieSetter).toHaveBeenCalledWith(expect.stringContaining("domain=example.com"));
		});

		test("should set secure cookie", () => {
			CookieManager.set("name", "value", { secure: true });
			expect(cookieSetter).toHaveBeenCalledWith(expect.stringContaining("secure"));
		});

		test("should set cookie with sameSite attribute", () => {
			CookieManager.set("name", "value", { sameSite: "Strict" });
			expect(cookieSetter).toHaveBeenCalledWith(expect.stringContaining("samesite=Strict"));
		});

		test("should set cookie with multiple options", () => {
			CookieManager.set("name", "value", {
				path: "/test",
				domain: "example.com",
				secure: true,
				sameSite: "Lax",
			});

			expect(cookieSetter).toHaveBeenCalledWith(
				expect.stringMatching(/name=value.*path=\/test.*domain=example\.com.*secure.*samesite=Lax/)
			);
		});
	});

	describe("get", () => {
		test("should return null for non-existent cookie", () => {
			expect(CookieManager.get("nonexistent")).toBeNull();
		});

		test("should get a cookie value", () => {
			documentCookies = ["name=value"];
			expect(CookieManager.get("name")).toBe("value");
		});

		test("should get a cookie with encoded name and value", () => {
			documentCookies = ["test%20name=test%20value"];
			expect(CookieManager.get("test name")).toBe("test value");
		});

		test("should get the correct cookie when multiple cookies exist", () => {
			documentCookies = ["first=value1", "second=value2", "third=value3"];
			expect(CookieManager.get("second")).toBe("value2");
		});
	});

	describe("remove", () => {
		test("should remove a cookie", () => {
			documentCookies = ["name=value"];
			CookieManager.remove("name");
			expect(cookieSetter).toHaveBeenCalledWith(expect.stringContaining("expires="));
			expect(documentCookies).toHaveLength(0);
		});

		test("should remove a cookie with path and domain", () => {
			documentCookies = ["name=value"];
			CookieManager.remove("name", "/test", "example.com");
			expect(cookieSetter).toHaveBeenCalledWith(
				expect.stringMatching(/name=.*expires=.*path=\/test.*domain=example\.com/)
			);
		});
	});

	describe("has", () => {
		test("should return true if cookie exists", () => {
			documentCookies = ["name=value"];
			expect(CookieManager.has("name")).toBe(true);
		});

		test("should return false if cookie does not exist", () => {
			expect(CookieManager.has("nonexistent")).toBe(false);
		});
	});

	describe("getAll", () => {
		test("should return empty object when no cookies exist", () => {
			expect(CookieManager.getAll()).toEqual({});
		});

		test("should get all cookies", () => {
			documentCookies = ["first=value1", "second=value2", "third=value3"];
			expect(CookieManager.getAll()).toEqual({
				first: "value1",
				second: "value2",
				third: "value3",
			});
		});

		test("should handle encoded cookie names and values", () => {
			documentCookies = ["test%20name=test%20value", "normal=value"];
			expect(CookieManager.getAll()).toEqual({
				"test name": "test value",
				normal: "value",
			});
		});
	});
});
