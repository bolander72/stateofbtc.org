import { surveys } from "@/surveys";
import Review from "@/components/survey/review";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	return surveys.map(({ id }) => ({
		surveyId: id,
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ surveyId: string }>;
}) {
	const { surveyId } = await params;
	const survey = surveys.find((survey) => survey.id === surveyId);

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
