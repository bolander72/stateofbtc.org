// npx ts-node scripts/update-ids.ts
const fs = require("fs");
const path = require("path");
const { customAlphabet } = require("nanoid");

const alphabet: string = "2346789abcdefghijkmnpqrtwxyz";
const nanoid: () => string = customAlphabet(alphabet, 21);

function replaceIdsInFile(filePath: string): void {
	const content: string = fs.readFileSync(filePath, "utf8");

	// Replace all "id: "number"" patterns with nanoid
	const newContent: string = content.replace(
		/id: "(\d+)"/g,
		() => `id: "${nanoid()}"`,
	);

	fs.writeFileSync(filePath, newContent);
	console.log("IDs replaced successfully!");
}

// Usage:
replaceIdsInFile(path.resolve(__dirname, "../surveys/state-of-btc/index.ts"));
