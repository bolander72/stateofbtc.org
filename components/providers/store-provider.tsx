"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Store } from "tinybase";
import { getStore } from "@/lib/store";

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({
	surveyId,
	children,
}: {
	surveyId: string;
	children: React.ReactNode;
}) {
	const [store, setStore] = useState<Store | null>(null);

	useEffect(() => {
		getStore(surveyId).then(setStore);
	}, [surveyId]);

	if (!store) return null;

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}

export function useStore() {
	return useContext(StoreContext);
}
