import mongoose, { Model } from "mongoose";
import { ISubmissionDocument } from "@/db/models/types";

const submissionSchema = new mongoose.Schema({
	surveyId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Survey",
	},
	submittedDate: {
		type: Date,
		default: Date.now,
	},
	responses: [
		{
			sectionId: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
			questionId: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
			answer: {
				value: mongoose.Schema.Types.Mixed,
				type: {
					type: String,
					required: true,
				},
				comment: String,
				otherText: String,
				isSkipped: {
					type: Boolean,
					default: false,
				},
			},
		},
	],
});

export const Submission =
	(mongoose.models.Submission as Model<ISubmissionDocument>) ||
	mongoose.model<ISubmissionDocument>("Submission", submissionSchema);
