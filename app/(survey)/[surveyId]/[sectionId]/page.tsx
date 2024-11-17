import Question from "@/components/survey/question";
import { Button } from "@/components/ui/button";
import { getSurvey, getSurveyMetadata } from "@/db/queries";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const surveys = await getSurveyMetadata({ withSectionMetadata: true });

	return surveys.flatMap((survey) =>
		survey.sections.map((section) => ({
			surveyId: String(survey._id),
			sectionId: String(section._id),
		})),
	);
}

export default async function Page({
	params,
}: {
	params: Promise<{ surveyId: string; sectionId: string }>;
} & {}) {
	const { surveyId, sectionId } = await params;

	const survey = await getSurvey({ _id: surveyId });
	const sectionIndex = survey?.sections.findIndex(
		(section) => String(section._id) === sectionId,
	);

	if (!survey || sectionIndex === undefined || sectionIndex === -1) {
		return notFound();
	}

	const section = survey.sections[sectionIndex]!;
	const prevSection =
		sectionIndex > 0 ? survey.sections[sectionIndex - 1] : null;
	const nextSection =
		sectionIndex < survey.sections.length - 1
			? survey.sections[sectionIndex + 1]
			: null;

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-3xl font-bold">{section.title}</h1>
				<h2>{section.description}</h2>
			</div>

			<div className="flex justify-between">
				{prevSection && (
					<Button asChild variant="secondary">
						<Link
							href={`/${surveyId}/${String(prevSection._id)}`}
							className="flex items-center"
						>
							<ArrowLeftIcon className="h-4 w-4" />
							{prevSection.title}
						</Link>
					</Button>
				)}
			</div>

			{section.questions.map((question) => (
				<Question key={String(question._id)} {...question} />
			))}

			<div className="flex justify-between mt-8">
				<div />
				{nextSection ? (
					<Button asChild variant="secondary">
						<Link
							href={`/${surveyId}/${String(nextSection._id)}`}
							className="flex items-center"
						>
							{nextSection.title}
							<ArrowRightIcon className="h-4 w-4" />
						</Link>
					</Button>
				) : (
					<Button asChild variant="secondary">
						<Link href={`/${surveyId}/review`} className="flex items-center">
							Review
							<ArrowRightIcon className="h-4 w-4" />
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
