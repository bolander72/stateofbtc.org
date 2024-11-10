import { createStore, Store } from "tinybase";
import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db";
import { createLocalPersister } from "tinybase/persisters/persister-browser";

let store: Store | null = null;

function isIndexedDBAvailable() {
	try {
		return (
			typeof window !== "undefined" &&
			typeof window.indexedDB !== "undefined" &&
			window.indexedDB !== null
		);
	} catch {
		return false;
	}
}

export async function getStore(surveyId: string) {
	if (store) return store;
	store = createStore().setTablesSchema({
		responses: {
			surveyId: { type: "string" },
			sectionId: { type: "string" },
			questionId: { type: "string" },
			type: { type: "string" },
			value: { type: "string", default: "[]" }, // stringified array
			otherText: { type: "string", default: "" },
			commentText: { type: "string", default: "" },
			isSkipped: { type: "boolean", default: false },
		},
	});

	try {
		let persister;
		if (isIndexedDBAvailable()) {
			persister = createIndexedDbPersister(store, surveyId);
		} else {
			console.log("IndexedDB not available, falling back to localStorage");
			persister = createLocalPersister(store, surveyId);
		}

		await persister.startAutoLoad();
		await persister.startAutoSave();
	} catch (error) {
		console.error("Failed to initialize a persister:", error);
		console.warn("Data will not persist between page reloads");
	}

	return store;
}
