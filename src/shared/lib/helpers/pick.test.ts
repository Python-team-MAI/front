import { pick } from "./pick";

describe("pick", () => {
	it("should return a new object with only the specified keys", () => {
		const obj = { a: 1, b: 2, c: 3 };
		const result = pick(obj, ["a", "c"]);
		expect(result).toEqual({ a: 1, c: 3 });
	});

	it("should ignore keys that are not present in the original object", () => {
		const obj = { a: 1, b: 2, c: 3 };
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const result = pick(obj, ["a", "d"]);
		expect(result).toEqual({ a: 1 });
	});

	it("should return an empty object if no keys are provided", () => {
		const obj = { a: 1, b: 2 };
		const result = pick(obj, []);
		expect(result).toEqual({});
	});

	it("should return an empty object if the input object is empty", () => {
		const obj: Record<string, unknown> = {};
		const result = pick(obj, ["a", "b"]);
		expect(result).toEqual({});
	});

	it("should handle nested objects correctly", () => {
		const obj = { a: { x: 1 }, b: 2, c: { y: 3 } };
		const result = pick(obj, ["a", "c"]);
		expect(result).toEqual({ a: { x: 1 }, c: { y: 3 } });
	});
});
