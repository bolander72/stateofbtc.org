import { Document, ObjectId } from "mongoose";

export interface IQuestionOption {
	_id: ObjectId;
	label: string;
	isOther?: boolean;
	isNegative?: boolean;
}

export interface IQuestion {
	_id: ObjectId;
	title: string;
	type: "checkbox" | "radio" | "text" | `select-${string}`;
	options?: IQuestionOption[];
}

export interface ISection {
	_id: ObjectId;
	title: string;
	description: string;
	questions: IQuestion[];
}

export interface ISurvey {
	_id: Document["_id"];
	title: string;
	year: number;
	sections: ISection[];
	isActive: boolean;
	isDefault: boolean;
	submissionStartDate: Date;
	submissionEndDate: Date;
}

export interface ISurveyDocument extends ISurvey, Document {}

export interface ISubmissionDocument extends Document {
	surveyId: ObjectId;
	date: Date;
	responses: Array<{
		sectionId: ObjectId;
		questionId: ObjectId;
		answer: {
			value: string[];
			type: string;
			comment: string;
			otherText: string;
			isSkipped: boolean;
		};
	}>;
}
