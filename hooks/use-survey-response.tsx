import { useState } from "react";
import { useStore } from "@/components/providers/store-provider";
import { useParams } from "next/navigation";

export type QuestionType = "checkbox" | "radio" | "text";

export type Option = {
	id: string;
	label: string;
	isNegative?: boolean;
	isOther?: boolean;
};

export type SurveyResponse = {
	surveyId: string;
	sectionId: string;
	questionId: string;
	type: QuestionType;
	value: string[];
	otherText: string;
	commentText: string;
	isSkipped: boolean;
	isOther?: boolean;
};

export function useSurveyResponse(questionId: string, type: QuestionType) {
	const store = useStore();
	const params = useParams();

	const getDefaultValue = (): SurveyResponse => ({
		surveyId: params.surveyId as string,
		sectionId: params.sectionId as string,
		questionId,
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
		const stored = store?.getRow("responses", questionId);
		return parseStoredResponse(stored || getDefaultValue());
	});

	const updateResponse = (updates: Partial<SurveyResponse>) => {
		if (!store) return;

		const newResponse = {
			...response,
			...updates,
		};

		setResponse(newResponse);

		store.setPartialRow("responses", questionId, {
			...newResponse,
			value: JSON.stringify(newResponse.value),
		});
	};

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
