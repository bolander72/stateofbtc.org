import Review from "@/components/survey/review";
import { notFound } from "next/navigation";
import { getSurveyMetadata } from "@/db/queries";

export async function generateStaticParams() {
	const surveys = await getSurveyMetadata();

	return surveys.map(({ _id }) => ({
		surveyId: String(_id),
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ surveyId: string }>;
}) {
	const { surveyId } = await params;
	const surveys = await getSurveyMetadata();
	const survey = surveys.find((survey) => String(survey._id) === surveyId);

	if (!survey) {
		return notFound();
	}

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-3xl font-bold">Survey Review</h1>
				<h2>Review responses and submit survey</h2>
			</div>
			<Review />
		</div>
	);
}
