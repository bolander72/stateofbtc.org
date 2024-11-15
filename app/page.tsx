import { Button } from "@/components/ui/button";
import { surveys } from "@/surveys";
import { Link } from "next-view-transitions";

export default function Home() {
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
						<Link href={`/${surveys[0].id}`}>Enter</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
