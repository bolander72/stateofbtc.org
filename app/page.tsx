import { Button } from "@/components/ui/button";
import { getSurveyMetadata } from "@/db/queries";
import { Link } from "next-view-transitions";

export default async function Home() {
	const surveys = await getSurveyMetadata();
	let defaultSurvey = surveys.find((survey) => survey.isDefault);

	if (!defaultSurvey) {
		defaultSurvey = surveys[0];
	}

	return (
		<section className="flex p-4 flex-col min-h-[100dvh] items-center justify-center space-y-2">
			<div className="space-y-2">
				<h1 className="text-xl font-bold -mb-1.5">Annual Bitcoin Survey</h1>
				<img
					src="/element.png"
					alt="State of Bitcoin"
					className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg dark:invert"
				/>
				<div className="flex justify-end">
					<Button variant="default" type="button" asChild>
						<Link href={`/${defaultSurvey._id}`}>Enter</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
