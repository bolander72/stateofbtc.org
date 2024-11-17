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
	type: "checkbox" | "radio" | "text";
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
	createdAt: Date;
	updatedAt: Date;
}

export interface ISurveyDocument extends ISurvey, Document {}
