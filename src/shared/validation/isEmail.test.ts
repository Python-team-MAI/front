import { isEmail } from "./isEmail";

describe("isEmail", () => {
	test("should return true for valid email addresses", () => {
		expect(isEmail("test@example.com")).toBe(true);
		expect(isEmail("user.name@domain.co.uk")).toBe(true);
		expect(isEmail("email@sub.domain.com")).toBe(true);
	});

	test("should return false for invalid email addresses", () => {
		expect(isEmail("invalid-email")).toBe(false);
		expect(isEmail("user@domain")).toBe(false);
		expect(isEmail("user@.com")).toBe(false);
		expect(isEmail("user@domain.c")).toBe(false);
		expect(isEmail("user@domain..com")).toBe(false);
		expect(isEmail("user@domain.com.")).toBe(false);
		expect(isEmail(" user@example.com ")).toBe(false);
		expect(isEmail("user@example.com@domain.com")).toBe(false);
	});
});
