import Question from "@/components/question";
import survey from "@/surveys/state-of-btc";

export async function generateStaticParams() {
	return survey.sections.map((_, index) => ({
		section: (index + 1).toString(),
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ section: string }>;
}) {
	const index = Number((await params).section) - 1;
	const section = survey.sections[Number(index)];

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-3xl font-bold">
					{index + 1}) {section.title}
				</h1>
				<h2>{section.description}</h2>
			</div>
			{section.questions.map((question) => (
				<Question key={question.id} {...question} />
			))}
		</div>
	);
}
