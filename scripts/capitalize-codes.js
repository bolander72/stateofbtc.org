const fs = require("fs");
const path = require("path");

// Read the file
const filePath = path.join(__dirname, "../lib/countries/index.ts");
let content = fs.readFileSync(filePath, "utf8");

// Find all code: "xx" patterns and capitalize them
content = content.replace(/code: "([^"]+)"/g, (match, code) => {
	return `code: "${code.toUpperCase()}"`;
});

// Write back to file
fs.writeFileSync(filePath, content);

console.log("Country codes have been capitalized");
