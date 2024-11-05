import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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

			<div className="flex gap-4 mt-4">
				<Button variant="default" asChild>
					<Link href="/survey">Get Started</Link>
				</Button>
			</div>
		</section>
	);
}
