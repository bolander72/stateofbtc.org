"use client";

import { useState } from "react";
import { useSurveyResponse } from "@/hooks/use-survey-response";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, SkipForwardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IQuestion, IQuestionOption } from "@/db/models/types";
import { ObjectId } from "mongoose";

interface Props {
	_id: ObjectId;
	title: string;
	type: IQuestion["type"];
	options?: IQuestionOption[];
}

export default function Question({ _id, title, type, options = [] }: Props) {
	const [showComment, setShowComment] = useState(false);
	const { response, updateResponse, isComplete } = useSurveyResponse(
		String(_id),
		type,
	);

	const handleCheckboxChange = (optionId: string, checked: boolean) => {
		const option = options.find((opt) => String(opt._id) === optionId);
		const newResponse = option?.isNegative
			? checked
				? [optionId]
				: []
			: checked
				? [
						...response.value.filter(
							(id: string) =>
								!options.find((opt) => String(opt._id) === id)?.isNegative,
						),
						optionId,
					]
				: response.value.filter((id: string) => id !== optionId);

		updateResponse({ value: newResponse });
	};

	const isDisabled = (optionId: string) => {
		const hasNegativeSelected = response.value.some(
			(id: string) => options.find((opt) => String(opt._id) === id)?.isNegative,
		);
		const option = options.find((opt) => String(opt._id) === optionId);
		return response.isSkipped || (hasNegativeSelected && !option?.isNegative);
	};

	const getBorderStyle = () => {
		return isComplete
			? "border-green-700 dark:border-green-600"
			: "border-border";
	};

	return (
		<div
			className={`space-y-4 border rounded-md p-4 text-pretty duration-700 ${getBorderStyle()}`}
			id={String(_id)}
		>
			<h3 className="font-medium text-lg">{title}</h3>

			{type === "checkbox" && (
				<div className="space-y-2">
					{options.map((option) => (
						<div key={String(option._id)}>
							<div className="flex items-center space-x-2">
								<Checkbox
									id={`${_id}-${option._id}`}
									checked={response.value.includes(String(option._id))}
									disabled={isDisabled(String(option._id))}
									onCheckedChange={(checked: boolean) =>
										handleCheckboxChange(String(option._id), checked)
									}
								/>
								<Label htmlFor={`${_id}-${option._id}`}>{option.label}</Label>
							</div>
							{option.isOther &&
								response.value.includes(String(option._id)) && (
									<Textarea
										disabled={!!response.isSkipped}
										placeholder="Please specify..."
										value={response.otherText}
										onChange={(e) =>
											updateResponse({ otherText: e.target.value })
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
					value={response.value[0]}
					onValueChange={(value: string) =>
						updateResponse({ type: "radio", value: [value] })
					}
				>
					{options.map((option) => (
						<div
							key={String(option._id)}
							className="flex items-center space-x-2"
						>
							<RadioGroupItem
								disabled={!!response.isSkipped}
								value={String(option._id)}
								id={`${_id}-${option._id}`}
								checked={response.value.includes(String(option._id))}
							/>
							<Label
								htmlFor={`${_id}-${option._id}`}
								className={cn(!!response.isSkipped && "opacity-70")}
							>
								{option.label}
							</Label>
						</div>
					))}
				</RadioGroup>
			)}

			{type === "text" && (
				<Textarea
					disabled={!!response.isSkipped}
					placeholder="Enter your response"
					value={response.value[0] || ""}
					onChange={(e) =>
						updateResponse({ type: "text", value: [e.target.value] })
					}
					className="max-w-md"
				/>
			)}

			<div className="flex justify-between">
				<Button
					variant="outline"
					disabled={!!response.commentText}
					size="sm"
					onClick={() => setShowComment((prev) => !prev)}
					className={showComment ? "bg-muted" : ""}
				>
					<MessageSquareIcon className="h-4 w-4" />
				</Button>
				<Button
					variant={!!response.isSkipped ? "default" : "outline"}
					size="sm"
					onClick={() => updateResponse({ isSkipped: !response.isSkipped })}
				>
					{!!response.isSkipped ? "Skipped" : "Skip"}{" "}
					<SkipForwardIcon className="h-4 w-4" />
				</Button>
			</div>

			{showComment && (
				<Textarea
					placeholder="Add your comment here..."
					value={response.commentText}
					onChange={(e) =>
						updateResponse({
							commentText: e.target.value,
						})
					}
					className="max-w-md"
				/>
			)}
		</div>
	);
}
