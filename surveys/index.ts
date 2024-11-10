import BitcoinSurvey_2024 from "@/surveys/bitcoin/2024";
import { Survey, SurveyMetadata } from "./types";

export const surveys: Survey[] = [BitcoinSurvey_2024];

export const currentSurveysMetadata: SurveyMetadata[] = surveys.map(
	({ id, title }) => ({
		id,
		title,
		isDisabled: false,
	}),
);
