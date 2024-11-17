import { Schema } from "mongoose";
import { IQuestion, IQuestionOption } from "@/db/models/types";

const questionOptionSchema = new Schema<IQuestionOption>({
	label: { type: String, required: true },
	isOther: { type: Boolean, default: false },
	isNegative: { type: Boolean, default: false },
});

export const questionSchema = new Schema<IQuestion>({
	title: { type: String, required: true },
	type: {
		type: String,
		required: true,
		enum: ["checkbox", "radio", "text"],
	},
	options: [questionOptionSchema],
});
