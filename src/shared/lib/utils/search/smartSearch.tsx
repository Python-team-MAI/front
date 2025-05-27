interface SmartSearchOptions<T extends Record<string, unknown>> {
	keys?: Array<keyof T>;
	threshold?: number;
	limit?: number;
	exactMatchBoost?: number;
	partialMatchBoost?: number;
	weights?: Partial<Record<keyof T, number>>;
}

type SearchResult<T> = {
	item: T;
	score: number;
	index: number;
};

const levenshteinDistance = (a: string, b: string): number => {
	const matrix: number[][] = [];
	for (let i = 0; i <= b.length; i++) matrix[i] = [i];
	for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
			matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
		}
	}
	return matrix[b.length][a.length];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const smartSearch = <T extends Record<string, any>>(
	data: T[],
	searchQuery: string,
	options: SmartSearchOptions<T> = {}
): T[] => {
	const { keys = [], threshold = 0.3, limit = 10, exactMatchBoost = 2, partialMatchBoost = 1, weights } = options;

	const normalize = (str: string): string =>
		str
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");

	const query = normalize(searchQuery).trim();
	if (!query) return [];

	const searchTerms = query.split(/\s+/);
	const results: SearchResult<T>[] = [];

	const searchKeys = (keys.length > 0 ? keys : Object.keys(data[0] || {})) as Array<keyof T>;

	data.forEach((item, index) => {
		let score = 0;

		searchKeys.forEach((key) => {
			const fieldValue = normalize(String(item[key] ?? ""));
			const fieldWeight = (weights?.[key] as number | undefined) ?? 1;

			searchTerms.forEach((term) => {
				if (fieldValue === term) {
					score += exactMatchBoost * fieldWeight;
					return;
				}

				if (fieldValue.includes(term)) {
					score += partialMatchBoost * fieldWeight;
					return;
				}

				const maxLength = Math.max(fieldValue.length, term.length);
				const distance = levenshteinDistance(fieldValue, term);
				const similarity = 1 - distance / maxLength;

				if (similarity >= threshold) {
					score += similarity * fieldWeight;
				}
			});
		});

		if (score > 0) {
			results.push({ item, score, index });
		}
	});

	return results
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((result) => result.item);
};
