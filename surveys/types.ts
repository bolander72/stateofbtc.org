type QuestionType = "checkbox" | "radio" | "text";

interface QuestionOption {
	id: string;
	label: string;
	isOther?: boolean;
	isNegative?: boolean;
}

interface Question {
	id: string;
	title: string;
	type: QuestionType;
	options?: QuestionOption[];
}

interface Section {
	id: string;
	title: string;
	description: string;
	questions: Question[];
}

export interface Survey {
	id: string;
	title: string;
	year: number;
	sections: Section[];
}

export interface SurveyMetadata {
	id: string;
	title: string;
	isDisabled: boolean;
}
