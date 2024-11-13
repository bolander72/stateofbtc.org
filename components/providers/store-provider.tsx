"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Store } from "tinybase";
import { getStore } from "@/lib/store";
import { useParams } from "next/navigation";

interface Value {
	store: Store;
	autosaving: boolean;
	setAutosaving: (autosaving: boolean) => void;
}

const StoreContext = createContext<Value>({} as Value);

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const params = useParams();
	const [store, setStore] = useState<Store | null>(null);
	const [autosaving, setAutosaving] = useState(true);

	useEffect(() => {
		getStore(params.surveyId as string)
			.then(setStore)
			.catch(() => {
				setAutosaving(false);
			});
	}, [params.surveyId]);

	if (!store) return null;

	return (
		<StoreContext.Provider value={{ store, autosaving, setAutosaving }}>
			{children}
		</StoreContext.Provider>
	);
}

export function useStore() {
	return useContext(StoreContext);
}
