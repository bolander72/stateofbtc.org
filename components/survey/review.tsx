"use client";

import { useStore } from "@/components/providers/store-provider";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { CheckIcon, XIcon } from "lucide-react";
import { ISurvey } from "@/db/models/types";

export default function Review({ survey }: { survey: ISurvey }) {
	const { store } = useStore();

	console.log("SURVEY", survey);

	if (!survey) {
		return notFound();
	}

	const getMissingQuestions = (sectionId: string) => {
		const sectionQuestions =
			survey.sections.find((s) => String(s._id) === sectionId)?.questions || [];

		return sectionQuestions.filter((question) => {
			const response = store?.getCell(
				"responses",
				String(question._id),
				"value",
			);
			const isSkipped = store?.getCell(
				"responses",
				String(question._id),
				"isSkipped",
			);

			try {
				const parsedValue = response ? JSON.parse(response as string) : [];
				return !response || (parsedValue.length === 0 && !isSkipped);
			} catch (e) {
				console.error("Error parsing response value:", e);
				return true; // Consider it missing if we can't parse the value
			}
		});
	};

	return (
		<div className="space-y-4">
			{survey.sections?.some(
				(section) => getMissingQuestions(String(section._id)).length > 0,
			) ? (
				<>
					<p>The following sections contain unanswered questions:</p>
					<Accordion
						type="multiple"
						className="space-y-4"
						defaultValue={[
							survey.sections
								.find(
									(section) =>
										getMissingQuestions(String(section._id)).length > 0,
								)
								?._id.toString() || "",
						]}
					>
						{survey.sections.map((section) => {
							const missingQuestions = getMissingQuestions(String(section._id));

							if (missingQuestions.length === 0) return null;

							return (
								<AccordionItem
									key={String(section._id)}
									value={String(section._id)}
								>
									<AccordionTrigger className="!no-underline">
										<div className="flex justify-between gap-2">
											<span className="hover:underline">{section.title}</span>
											<div className="flex items-center gap-2 text-muted-foreground text-sm">
												<span>
													{section.questions.length - missingQuestions.length}/
													{section.questions.length}
												</span>
												{section.questions.length - missingQuestions.length >
												0 ? (
													<CheckIcon className="h-3 w-3 text-green-700 dark:text-green-600" />
												) : (
													<XIcon className="h-3 w-3 text-red-700 dark:text-red-600" />
												)}
											</div>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<ul className="space-y-2 list-disc list-inside">
											{missingQuestions.map((question) => (
												<Link
													key={String(question._id)}
													href={`/${survey._id}/${String(section._id)}#${String(question._id)}`}
													className="hover:underline line-clamp-1 w-fit"
												>
													<li>{question.title}</li>
												</Link>
											))}
										</ul>
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</>
			) : (
				<p>All questions have been answered.</p>
			)}
		</div>
	);
}
