import QuestionItem from "@/components/survey/question-item";

export default function Page() {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-3xl font-bold">1) Features</h1>
				<h2>Old and new Bitcoin features</h2>
			</div>
			<QuestionItem
				id="bitcoin-features"
				title="Which of these Bitcoin features have you used?"
				type="checkbox"
				options={[
					{ id: "taproot", label: "Taproot" },
					{ id: "segwit", label: "SegWit" },
					{ id: "lightning", label: "Lightning Network" },
					{ id: "other", label: "Other (please specify)", isOther: true },
					{ id: "none", label: "None", isNegative: true },
				]}
			/>

			<QuestionItem
				id="usage-frequency"
				title="How frequently do you use Bitcoin features?"
				type="radio"
				options={[
					{ id: "daily", label: "Daily" },
					{ id: "weekly", label: "Weekly" },
					{ id: "monthly", label: "Monthly" },
					{ id: "rarely", label: "Rarely" },
					{ id: "never", label: "Never" },
				]}
			/>

			<QuestionItem
				id="additional-comments"
				title="Any additional comments about Bitcoin features?"
				type="text"
			/>
		</div>
	);
}
