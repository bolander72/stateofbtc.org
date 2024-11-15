// npx ts-node scripts/check-ids.ts
const { Survey } = require("../surveys/types");
const survey = require("../surveys/bitcoin/2024/index.ts");

interface IdCheckResult {
	totalIds: number;
	invalidLengthIds: string[];
	duplicateIds: string[];
	allValid: boolean;
}

function checkIds(surveyData: typeof Survey): IdCheckResult {
	const ids = new Set<string>();
	let invalidLengthIds: string[] = [];
	let duplicateIds: string[] = [];

	// Helper function to process an object and collect IDs
	function processObject(obj: any): void {
		if (obj && typeof obj === "object") {
			if ("id" in obj) {
				const id = obj.id as string;
				if (id.length !== 21) {
					invalidLengthIds.push(id);
				}
				if (ids.has(id)) {
					duplicateIds.push(id);
				}
				ids.add(id);
			}
			// Recursively process arrays and objects
			Object.values(obj).forEach((value) => {
				if (Array.isArray(value) || typeof value === "object") {
					processObject(value);
				}
			});
		}
	}

	processObject(surveyData);

	return {
		totalIds: ids.size,
		invalidLengthIds,
		duplicateIds,
		allValid: invalidLengthIds.length === 0 && duplicateIds.length === 0,
	};
}

const result = checkIds(survey);
console.log(result);
