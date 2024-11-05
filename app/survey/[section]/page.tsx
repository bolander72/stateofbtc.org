import QuestionItem from "@/components/survey/question-item";
import survey from "@/surveys/state-of-btc";

export default async function Page({
	params,
}: {
	params: { section: string };
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
				<QuestionItem
					key={question.id}
					id={question.id}
					title={question.title}
					type={question.type}
					options={question.options}
				/>
			))}
		</div>
	);
}
