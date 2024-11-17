import { Schema } from "mongoose";
import { ISection } from "@/db/models/types";
import { questionSchema } from "@/db/models/question.model";

export const sectionSchema = new Schema<ISection>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	questions: [questionSchema],
});
