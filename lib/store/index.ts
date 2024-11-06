import { createStore, Store } from "tinybase";
import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db";

let store: Store | null = null;

export async function getStore(surveyId: string) {
	if (store) return store;
	store = createStore().setTablesSchema({
		responses: {
			id: { type: "string" },
			type: { type: "string" },
			value: { type: "string", default: "[]" }, // stringified array
			otherText: { type: "string", default: "" },
			commentText: { type: "string", default: "" },
			isSkipped: { type: "boolean", default: false },
		},
	});

	const persister = createIndexedDbPersister(store, surveyId);

	try {
		await persister.startAutoLoad();
		await persister.startAutoSave();
	} catch (error) {
		console.error("Failed to initialize IndexedDB persister:", error);
	}

	return store;
}
