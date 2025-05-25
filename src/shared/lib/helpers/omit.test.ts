import { omit } from "./omit";

describe("omit", () => {
	it("should omit specified keys from the object", () => {
		const obj = { a: 1, b: 2, c: 3 };
		const result = omit(obj, ["b", "c"]);
		expect(result).toEqual({ a: 1 });
	});

	it("should return a new object without modifying the original", () => {
		const obj = { a: 1, b: 2 };
		const result = omit(obj, ["a"]);
		expect(result).toEqual({ b: 2 });
		expect(obj).toEqual({ a: 1, b: 2 });
	});

	it("should handle an empty keys array", () => {
		const obj = { a: 1, b: 2 };
		const result = omit(obj, []);
		expect(result).toEqual(obj);
	});

	it("should handle an object with nested keys correctly", () => {
		const obj = { a: 1, b: { c: 2 } };
		const result = omit(obj, ["b"]);
		expect(result).toEqual({ a: 1 });
	});

	it("should return an empty object if all keys are omitted", () => {
		const obj = { a: 1, b: 2 };
		const result = omit(obj, ["a", "b"]);
		expect(result).toEqual({});
	});
});
