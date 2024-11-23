import { Survey } from "@/db/models/survey.model";
import { ISurvey } from "./models/types";
import bitcoinSurvey2024 from "@/surveys/bitcoin/2024";

export const getSurveyMetadata = async ({
	_id,
	withSectionMetadata,
}: {
	_id?: string;
	withSectionMetadata?: boolean;
} = {}) => {
	const filter = _id ? { _id } : {};
	const projection = {
		title: 1,
		isActive: 1,
		isDefault: 1,
		...(withSectionMetadata && { sections: { title: 1, _id: 1 } }),
	};

	const surveys = await Survey.find(filter, projection).lean();
	return JSON.parse(JSON.stringify(surveys)) as ISurvey[];
};

export const getSurvey = async ({ _id }: { _id: string }) => {
	const survey = await Survey.findById(_id).lean();
	return JSON.parse(JSON.stringify(survey)) as ISurvey;
};

export async function createBitcoinSurvey2024() {
	// Deep clone to avoid mutating the original
	const surveyData = JSON.parse(JSON.stringify(bitcoinSurvey2024));

	// Replace section and question IDs
	// @ts-ignore
	surveyData.sections = surveyData.sections.map(({ id: _, ...section }) => ({
		...section,
		// @ts-ignore
		questions: section.questions.map(({ id: _, ...question }) => ({
			...question,
			// @ts-ignore
			options: question.options?.map(({ id: _, ...option }) => ({
				...option,
			})),
		})),
	}));

	// Add additional fields
	surveyData.isDefault = true;
	surveyData.submissionStartDate = new Date("2024-01-01");
	surveyData.submissionEndDate = new Date("2024-12-31");

	const survey = new Survey(surveyData);
	return survey.save();
}
