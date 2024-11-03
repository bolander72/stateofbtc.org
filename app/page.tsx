import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<section className="flex flex-col gap-4">
			<div>
				<h1 className="text-5xl font-bold">State of Bitcoin</h1>
				<h2 className="text-xl">The annual Bitcoin ecosystem survey</h2>
			</div>
			<img
				src="/element.png"
				alt="element"
				className="w-auto max-w-xs sm:max-w-sm md:max-w-md mt-4 dark:invert"
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
					<a href="/survey">Take the Survey</a>
				</Button>
				{/* <Button variant="outline" asChild>
					<a href="/2023-results">View 2023 Results</a>
				</Button> */}
			</div>
		</section>
	);
}
