"use client";

import { ISection } from "@/db/models/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SkipForwardIcon } from "lucide-react";
import { useStore } from "tinybase/ui-react";

export default function SkipSectionButton({ section }: { section: ISection }) {
	const store = useStore();
	const [isSkipped, setIsSkipped] = useState(
		section.questions.every((question) => {
			const response = store?.getRow("responses", String(question._id));
			return response?.isSkipped;
		}),
	);

	const skipSection = (skip: boolean) => {
		section.questions.forEach((question) => {
			store?.setPartialRow("responses", String(question._id), {
				isSkipped: skip,
			});
		});
		setIsSkipped(skip);
	};

	return (
		<Button
			variant={isSkipped ? "default" : "outline"}
			onClick={() => skipSection(!isSkipped)}
		>
			{isSkipped ? "Section Skipped" : "Skip Section"}
			<SkipForwardIcon className="h-4 w-4" />
		</Button>
	);
}
