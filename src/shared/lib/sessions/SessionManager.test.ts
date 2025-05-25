import { SessionManager } from "./SessionManager";

jest.mock("next/headers", () => ({
	cookies: jest.fn(() => ({
		get: jest.fn((key: string) => {
			if (key === "testKey") {
				return { value: "testValue" };
			}
			return undefined;
		}),
		set: jest.fn((key: string, value: string) => {
			if (key === "testKey") {
				return { name: key, value };
			}
			return undefined;
		}),
		delete: jest.fn((key: string) => {
			if (key === "testKey") {
				return true;
			}
			return false;
		}),
	})),
}));

describe("SessionManager", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getSession", () => {
		it("should return the value of the session key if it exists", async () => {
			const value = await SessionManager.getSession("testKey");
			expect(value).toBe("testValue");
		});

		it("should return undefined if the session key does not exist", async () => {
			const value = await SessionManager.getSession("nonExistentKey");
			expect(value).toBeUndefined();
		});
	});

	describe("deleteSessionKey", () => {
		it("should delete the session key if it exists", async () => {
			const result = await SessionManager.deleteSessionKey("testKey");
			expect(result).toBe(true);
		});

		it("should return false if the session key does not exist", async () => {
			const result = await SessionManager.deleteSessionKey("nonExistentKey");
			expect(result).toBe(false);
		});
	});

	describe("setSessionKey", () => {
		it("should set the session key with the provided value", async () => {
			const result = await SessionManager.setSessionKey("testKey", "newValue");
			expect(result).toEqual({ name: "testKey", value: "newValue" });
		});
	});
});
