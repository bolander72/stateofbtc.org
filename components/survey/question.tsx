"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, SkipForwardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IQuestion, IQuestionOption } from "@/db/models/types";
import { ObjectId } from "mongoose";
import { useStore, useCell } from "tinybase/ui-react";

interface Props {
	_id: ObjectId;
	title: string;
	type: IQuestion["type"];
	options?: IQuestionOption[];
}

export default function Question({ _id, title, type, options = [] }: Props) {
	const store = useStore();
	const [showComment, setShowComment] = useState(false);

	const value = useCell("responses", String(_id), "value") || "[]";
	const parsedValue = JSON.parse(value as string);

	const otherText = useCell("responses", String(_id), "otherText") || "";
	const commentText = useCell("responses", String(_id), "commentText") || "";
	const isSkipped = useCell("responses", String(_id), "isSkipped") || false;

	const handleCheckboxChange = (optionId: string, checked: boolean) => {
		const option = options.find((opt) => String(opt._id) === optionId);
		const newValue = option?.isNegative
			? checked
				? [optionId]
				: []
			: checked
				? [
						...parsedValue.filter(
							(id: string) =>
								!options.find((opt) => String(opt._id) === id)?.isNegative,
						),
						optionId,
					]
				: parsedValue.filter((id: string) => id !== optionId);

		store?.setCell("responses", String(_id), "value", JSON.stringify(newValue));
	};

	const updateResponse = (updates: Record<string, string | string[] | boolean>) => {
		store?.setPartialRow("responses", String(_id), {
			...updates,
			value: Array.isArray(updates.value)
				? JSON.stringify(updates.value)
				: value,
		});
	};

	const isDisabled = (optionId: string) => {
		const hasNegativeSelected = parsedValue.some(
			(id: string) => options.find((opt) => String(opt._id) === id)?.isNegative,
		);
		const option = options.find((opt) => String(opt._id) === optionId);
		return isSkipped || (hasNegativeSelected && !option?.isNegative);
	};

	const getBorderStyle = () => {
		return parsedValue.length > 0 || isSkipped
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
									checked={parsedValue.includes(String(option._id))}
									disabled={isDisabled(String(option._id))}
									onCheckedChange={(checked: boolean) =>
										handleCheckboxChange(String(option._id), checked)
									}
								/>
								<Label htmlFor={`${_id}-${option._id}`}>{option.label}</Label>
							</div>
							{option.isOther && parsedValue.includes(String(option._id)) && (
								<Textarea
									disabled={!!isSkipped}
									placeholder="Please specify..."
									value={otherText as string}
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
					value={parsedValue[0]}
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
								disabled={!!isSkipped}
								value={String(option._id)}
								id={`${_id}-${option._id}`}
								checked={parsedValue.includes(String(option._id))}
							/>
							<Label
								htmlFor={`${_id}-${option._id}`}
								className={cn(!!isSkipped && "opacity-70")}
							>
								{option.label}
							</Label>
						</div>
					))}
				</RadioGroup>
			)}

			{type === "text" && (
				<Textarea
					disabled={!!isSkipped}
					placeholder="Enter your response"
					value={parsedValue[0] || ""}
					onChange={(e) =>
						updateResponse({ type: "text", value: [e.target.value] })
					}
					className="max-w-md"
				/>
			)}

			<div className="flex justify-between">
				<Button
					variant="outline"
					disabled={!!commentText}
					size="sm"
					onClick={() => setShowComment((prev) => !prev)}
					className={showComment ? "bg-muted" : ""}
				>
					<MessageSquareIcon className="h-4 w-4" />
				</Button>
				<Button
					variant={!!isSkipped ? "default" : "outline"}
					size="sm"
					onClick={() => updateResponse({ isSkipped: !isSkipped })}
				>
					{!!isSkipped ? "Skipped" : "Skip"}{" "}
					<SkipForwardIcon className="h-4 w-4" />
				</Button>
			</div>

			{showComment && (
				<Textarea
					placeholder="Add your comment here..."
					value={commentText as string}
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
