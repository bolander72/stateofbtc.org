"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createStore } from "tinybase";
import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { useParams } from "next/navigation";
import { Provider, useCreateStore } from "tinybase/ui-react";

interface StoreContextValue {
	isPersisting: boolean;
}

const StoreContext = createContext<StoreContextValue>({} as StoreContextValue);

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const params = useParams();
	const [isPersisting, setIsPersisting] = useState(true);

	const store = useCreateStore(() => {
		return createStore().setTablesSchema({
			responses: {
				surveyId: { type: "string" },
				sectionId: { type: "string" },
				questionId: { type: "string" },
				type: { type: "string" },
				value: { type: "string", default: "[]" },
				otherText: { type: "string", default: "" },
				commentText: { type: "string", default: "" },
				isSkipped: { type: "boolean", default: false },
			},
		});
	}, [params.surveyId]);

	useEffect(() => {
		if (!store) return;

		async function initializePersister() {
			try {
				const isIndexedDBAvailable =
					typeof window !== "undefined" &&
					typeof window.indexedDB !== "undefined" &&
					window.indexedDB !== null;

				const persister = isIndexedDBAvailable
					? createIndexedDbPersister(store, params.surveyId as string)
					: createLocalPersister(store, params.surveyId as string);

				await persister.startAutoLoad();
				await persister.startAutoSave();

				const storageType = isIndexedDBAvailable ? "IndexedDB" : "LocalStorage";
				console.log(`✅ ${storageType} connected.`);
			} catch (error) {
				console.error("❌ Persister connection error:", error);
				setIsPersisting(false);
			}
		}

		initializePersister();
	}, [store, params.surveyId]);

	if (!store) return null;

	return (
		<Provider store={store}>
			<StoreContext.Provider value={{ isPersisting }}>
				{children}
			</StoreContext.Provider>
		</Provider>
	);
}

export function usePersisterStatus() {
	return useContext(StoreContext);
}
