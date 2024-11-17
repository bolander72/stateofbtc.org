import { Button } from "@/components/ui/button";
import { getSurveyMetadata } from "@/db/queries";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const surveys = await getSurveyMetadata();

	return surveys.map(({ _id }) => ({
		surveyId: String(_id),
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ surveyId: string }>;
}) {
	const { surveyId } = await params;

	const surveys = await getSurveyMetadata({
		_id: surveyId,
		withSectionMetadata: true,
	});

	const firstSection = surveys[0]?.sections[0];

	if (!surveys || !firstSection) {
		return notFound();
	}

	return (
		<section className="flex flex-col gap-4">
			<div>
				<h1 className="text-3xl font-bold">State of Bitcoin</h1>
				<h2>The annual Bitcoin ecosystem survey</h2>
			</div>
			<img
				src="/element.png"
				alt="element"
				className="w-auto max-w-xs sm:max-w-sm md:max-w-md dark:invert"
			/>
			<p>
				Help shape the future of Bitcoin through comprehensive community
				research. Your voice matters in driving the evolution of the Bitcoin
				ecosystem.
			</p>
			<p>
				Share your insights on Bitcoin&apos;s most impactful tools, products,
				services, media, events, and development resources. Join other Bitcoin
				users, developers, and industry leaders in this annual survey to map the
				landscape of Bitcoin innovation.
			</p>
			<p>
				The survey takes 15 - 20 minutes to complete. Your responses are
				anonymous and will be aggregated to provide valuable insights for the
				entire Bitcoin community.
			</p>
			<p>Ready?</p>

			<div className="flex gap-4">
				<Button variant="default" asChild>
					<Link href={`/${surveyId}/${firstSection?._id}`}>Get Started</Link>
				</Button>
				<Button variant="secondary" asChild>
					<Link href={`/${surveyId}/about`}>Read More</Link>
				</Button>
			</div>
		</section>
	);
}
