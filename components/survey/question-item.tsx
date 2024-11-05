"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, SkipForwardIcon } from "lucide-react";

export type QuestionType = "checkbox" | "radio" | "text";

export type Option = {
	id: string;
	label: string;
	isNegative?: boolean;
	isOther?: boolean;
};

type Answer = {
	type: QuestionType;
	response: string[];
	otherText: string;
	commentText: string;
	isSkipped: boolean;
};

interface Props {
	id: string;
	title: string;
	type: QuestionType;
	options?: Option[];
}

export default function QuestionItem({ id, title, type, options = [] }: Props) {
	const [answer, setAnswer] = useState<Answer>(() => {
		// Load saved answer from localStorage or use default
		const saved = localStorage.getItem(`question_${id}`);
		return saved
			? JSON.parse(saved)
			: {
					type,
					response: [],
					otherText: "",
					commentText: "",
					isSkipped: false,
				};
	});
	const [showComment, setShowComment] = useState(!!answer.commentText);

	// TODO: use local storage hook
	useEffect(() => {
		localStorage.setItem(`question_${id}`, JSON.stringify(answer));
	}, [answer, id]);

	const updateAnswer = (updates: Partial<Answer>) => {
		setAnswer((prev) => ({ ...prev, isSkipped: false, ...updates }));
	};

	const handleCheckboxChange = (optionId: string, checked: boolean) => {
		const option = options.find((opt) => opt.id === optionId);
		const newResponse = option?.isNegative
			? checked
				? [optionId]
				: []
			: checked
				? [
						...answer.response.filter(
							(id) => !options.find((opt) => opt.id === id)?.isNegative,
						),
						optionId,
					]
				: answer.response.filter((id) => id !== optionId);

		updateAnswer({ type: "checkbox", response: newResponse });
	};

	const isDisabled = (optionId: string) => {
		const hasNegativeSelected = answer.response.some(
			(id) => options.find((opt) => opt.id === id)?.isNegative,
		);
		const option = options.find((opt) => opt.id === optionId);
		return answer.isSkipped || (hasNegativeSelected && !option?.isNegative);
	};

	const getBorderStyle = () => {
		const hasOtherWithoutText =
			answer.response.includes("other") && !answer.otherText;
		return (answer.response.length > 0 && !hasOtherWithoutText) ||
			answer.isSkipped
			? "border-green-600"
			: "border-border";
	};

	return (
		<div
			className={`space-y-4 border rounded-md p-4 text-pretty duration-700 ${getBorderStyle()}`}
		>
			<h3 className="font-medium text-lg">{title}</h3>

			{type === "checkbox" && (
				<div className="space-y-2">
					{options.map((option) => (
						<div key={option.id}>
							<div className="flex items-center space-x-2">
								<Checkbox
									id={`${id}-${option.id}`}
									checked={answer.response.includes(option.id)}
									disabled={isDisabled(option.id)}
									onCheckedChange={(checked: boolean) =>
										handleCheckboxChange(option.id, checked)
									}
								/>
								<Label htmlFor={`${id}-${option.id}`}>{option.label}</Label>
							</div>
							{option.id === "other" && answer.response.includes(option.id) && (
								<Textarea
									disabled={answer.isSkipped}
									placeholder="Please specify..."
									value={answer.otherText}
									onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
										updateAnswer({ otherText: e.target.value })
									}
									className="max-w-md my-2"
								/>
							)}
						</div>
					))}
				</div>
			)}

			{type === "radio" && (
				<RadioGroup
					value={answer.response[0]}
					onValueChange={(value: string) =>
						updateAnswer({ type: "radio", response: [value] })
					}
				>
					{options.map((option) => (
						<div key={option.id} className="flex items-center space-x-2">
							<RadioGroupItem
								disabled={answer.isSkipped}
								value={option.id}
								id={`${id}-${option.id}`}
								checked={answer.response.includes(option.id)}
							/>
							<Label htmlFor={`${id}-${option.id}`}>{option.label}</Label>
						</div>
					))}
				</RadioGroup>
			)}

			{type === "text" && (
				<Textarea
					disabled={answer.isSkipped}
					placeholder="Enter your response"
					value={answer.response[0] || ""}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						updateAnswer({ type: "text", response: [e.target.value] })
					}
					className="max-w-md"
				/>
			)}

			<div className="flex justify-between">
				<Button
					variant="outline"
					disabled={!!answer.commentText}
					size="sm"
					onClick={() => setShowComment((prev) => !prev)}
					className={showComment ? "bg-muted" : ""}
				>
					<MessageSquareIcon className="h-4 w-4" />
				</Button>
				<Button
					variant={answer.isSkipped ? "default" : "outline"}
					size="sm"
					onClick={() =>
						setAnswer((prev) => ({ ...prev, isSkipped: !prev.isSkipped }))
					}
				>
					{answer.isSkipped ? "Skipped" : "Skip"}{" "}
					<SkipForwardIcon className="h-4 w-4" />
				</Button>
			</div>

			{showComment && (
				<Textarea
					placeholder="Add your comment here..."
					value={answer.commentText}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						updateAnswer({
							commentText: e.target.value,
							isSkipped: answer.isSkipped,
						})
					}
					className="max-w-md"
				/>
			)}
		</div>
	);
}
