import { Table } from "tinybase";
import { Submission } from "./models/submission.model";

export const createSurveySubmission = async (responses: Table) => {
	const surveyId = Object.values(responses)[0].surveyId;
	const submission = {
		surveyId,
		date: new Date(),
		responses: Object.values(responses).map((response) => ({
			sectionId: response.sectionId,
			questionId: response.questionId,
			answer: {
				value:
					typeof response.value === "string"
						? JSON.parse(response.value)
						: response.value,
				type: response.type,
				comment: response.commentText,
				otherText: response.otherText,
				isSkipped: response.isSkipped,
			},
		})),
	};

	const result = await Submission.create(submission);
	return result;
};
