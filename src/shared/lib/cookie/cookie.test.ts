import { CookieManager } from "./cookie";

describe("CookieManager", () => {
	let originalDocumentCookie: string;
	let originalDateNow: number;

	beforeEach(() => {
		originalDocumentCookie = document.cookie;
		document.cookie = "";
		originalDateNow = Date.now();
		Date.now = jest.fn(() => 1600000000000); // 1 января 2020, 00:00:00 UTC
	});

	afterEach(() => {
		document.cookie = originalDocumentCookie;

		Date.now = originalDateNow;
	});

	describe("set", () => {
		it("should set a cookie with name and value", () => {
			CookieManager.set("testCookie", "testValue");
			expect(CookieManager.get("testCookie")).toBe("testValue");
		});

		it("should set a cookie with expires as number", () => {
			const expires = 1; // дни
			CookieManager.set("testCookie", "testValue", { expires });
			const expectedDate = new Date(1600000000000 + expires * 24 * 60 * 60 * 1000).toUTCString();
			expect(document.cookie).toContain(`expires=${expectedDate}`);
		});

		it("should set a cookie with expires as Date", () => {
			const expires = new Date(2020, 10, 30, 14, 25, 0);
			CookieManager.set("testCookie", "testValue", { expires });
			expect(document.cookie).toContain(`expires=${expires.toUTCString()}`);
		});

		it("should set a cookie with expires as string", () => {
			const expires = "Fri, 30 Oct 2020 14:25:00 GMT";
			CookieManager.set("testCookie", "testValue", { expires });
			const cookie = document.cookie;
			expect(cookie).toContain(`expires=${expires}`);
		});

		it("should set a cookie with path", () => {
			const path = "/test";
			CookieManager.set("testCookie", "testValue", { path });
			const cookie = document.cookie;
			expect(cookie).toContain(`path=${path}`);
		});

		it("should set a cookie with domain", () => {
			const domain = "example.com";
			CookieManager.set("testCookie", "testValue", { domain });
			const cookie = document.cookie;
			expect(cookie).toContain(`domain=${domain}`);
		});

		it("should set a cookie with secure flag", () => {
			CookieManager.set("testCookie", "testValue", { secure: true });
			const cookie = document.cookie;
			expect(cookie).toContain("secure");
		});

		it("should set a cookie with sameSite attribute", () => {
			const sameSite = "Strict";
			CookieManager.set("testCookie", "testValue", { sameSite });
			const cookie = document.cookie;
			expect(cookie).toContain(`samesite=${sameSite}`);
		});
	});

	describe("get", () => {
		it("should return the value of a cookie", () => {
			CookieManager.set("testCookie", "testValue");
			expect(CookieManager.get("testCookie")).toBe("testValue");
		});

		it("should return null if the cookie does not exist", () => {
			expect(CookieManager.get("nonExistentCookie")).toBeNull();
		});
	});

	describe("remove", () => {
		it("should remove a cookie", () => {
			CookieManager.set("testCookie", "testValue");
			expect(CookieManager.get("testCookie")).toBe("testValue");
			CookieManager.remove("testCookie");
			expect(CookieManager.get("testCookie")).toBeNull();
		});

		it("should remove a cookie with path", () => {
			const path = "/test";
			CookieManager.set("testCookie", "testValue", { path });
			expect(CookieManager.get("testCookie")).toBe("testValue");
			CookieManager.remove("testCookie", path);
			expect(CookieManager.get("testCookie")).toBeNull();
		});

		it("should remove a cookie with domain", () => {
			const domain = "example.com";
			CookieManager.set("testCookie", "testValue", { domain });
			expect(CookieManager.get("testCookie")).toBe("testValue");
			CookieManager.remove("testCookie", undefined, domain);
			expect(CookieManager.get("testCookie")).toBeNull();
		});
	});

	describe("has", () => {
		it("should return true if the cookie exists", () => {
			CookieManager.set("testCookie", "testValue");
			expect(CookieManager.has("testCookie")).toBe(true);
		});

		it("should return false if the cookie does not exist", () => {
			expect(CookieManager.has("nonExistentCookie")).toBe(false);
		});
	});

	describe("getAll", () => {
		it("should return all cookies as an object", () => {
			CookieManager.set("cookie1", "value1");
			CookieManager.set("cookie2", "value2");
			const allCookies = CookieManager.getAll();
			expect(allCookies).toEqual({ cookie1: "value1", cookie2: "value2" });
		});
	});
});
