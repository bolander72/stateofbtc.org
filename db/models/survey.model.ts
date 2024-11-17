import mongoose, { Model, Schema } from "mongoose";
import { ISurveyDocument } from "@/db/models/types";
import { sectionSchema } from "@/db/models/section.model";

const surveySchema = new Schema<ISurveyDocument>(
	{
		title: { type: String, required: true },
		year: { type: Number, required: true },
		sections: [sectionSchema],
		isActive: {
			type: Boolean,
			default: true,
			get: function (this: ISurveyDocument): boolean {
				return this.submissionEndDate > new Date() && this.isActive;
			},
		},
		isDefault: { type: Boolean, default: false },
		submissionStartDate: { type: Date, required: true },
		submissionEndDate: { type: Date, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

// Add index for efficient date querying
surveySchema.index({ submissionStartDate: 1, submissionEndDate: 1 });

// Optional: Add method to check if survey is currently accepting submissions
surveySchema.methods.isAcceptingSubmissions = function (): boolean {
	const now = new Date();
	return (
		this.isActive &&
		now >= this.submissionStartDate &&
		now <= this.submissionEndDate
	);
};

surveySchema.pre("find", async function () {
	await Survey.updateMany(
		{
			submissionEndDate: { $lt: new Date() },
			isActive: true,
		},
		{
			$set: { isActive: false },
		},
	);
});

export const Survey =
	(mongoose.models.Survey as Model<ISurveyDocument>) ||
	mongoose.model<ISurveyDocument>("Survey", surveySchema);
