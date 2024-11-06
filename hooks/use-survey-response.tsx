import { useState } from "react";
import { useStore } from "@/components/providers/store-provider";

export type QuestionType = "checkbox" | "radio" | "text";

export type Option = {
	id: string;
	label: string;
	isNegative?: boolean;
	isOther?: boolean;
};

export type SurveyResponse = {
	id: string;
	type: QuestionType;
	value: string[];
	otherText: string;
	commentText: string;
	isSkipped: boolean;
	isOther?: boolean;
};

export function useSurveyResponse(id: string, type: QuestionType) {
	const store = useStore();

	const getDefaultValue = (): SurveyResponse => ({
		id,
		type,
		value: [],
		otherText: "",
		commentText: "",
		isSkipped: false,
	});

	const parseStoredResponse = (stored: any): SurveyResponse => {
		try {
			const value = stored.value
				? typeof stored.value === "string"
					? JSON.parse(stored.value)
					: stored.value
				: [];

			return {
				...getDefaultValue(),
				...stored,
				value,
			};
		} catch (e) {
			console.error("Error parsing stored response:", e);
			return getDefaultValue();
		}
	};

	const [response, setResponse] = useState<SurveyResponse>(() => {
		const stored = store?.getRow("responses", id);
		return parseStoredResponse(stored || getDefaultValue());
	});

	const updateResponse = (updates: Partial<SurveyResponse>) => {
		if (!store) return;

		const newResponse = {
			...response,
			...updates,
		};

		setResponse(newResponse);

		store.setPartialRow("responses", id, {
			...newResponse,
			value: JSON.stringify(newResponse.value),
		});
	};

	console.log("response", response);

	return {
		response,
		updateResponse,
		isAnswered: response.value.length > 0 || response.isSkipped,
		hasValidResponse:
			type === "text"
				? response.value[0]?.trim().length > 0
				: response.value.length > 0,
		isComplete:
			(response.value.length > 0 && !response.isOther) ||
			(response.isOther && response.otherText) ||
			response.isSkipped,
	};
}
