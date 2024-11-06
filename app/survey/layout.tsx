import { StoreProvider } from "@/components/providers/store-provider";
import { ReactNode } from "react";

export default function Surveylayout({ children }: { children: ReactNode }) {
	return <StoreProvider surveyId="1">{children}</StoreProvider>;
}
