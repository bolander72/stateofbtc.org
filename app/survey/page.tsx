import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<section className="flex flex-col gap-4">
			<div>
				<h1 className="text-3xl font-bold">The Survey</h1>
				<h2>An introduction to the sections</h2>
			</div>
			<p>
				The State of Bitcoin survey gathers insights into the experiences and
				challenges faced by the Bitcoin community in 2024. This comprehensive
				survey covers everything from technical features to community
				engagement, helping guide future development and education initiatives.
			</p>

			<h2 className="text-lg font-bold">Features</h2>
			<p>
				Explore how users engage with Bitcoin's latest technical features,
				including Taproot, SegWit, Lightning Network, and Schnorr Signatures.
				Share your experience with different address formats and identify
				challenges in implementing these advanced features.
			</p>

			<h2 className="text-lg font-bold">Wallets</h2>
			<p>
				Tell us about your Bitcoin wallet preferences, transaction habits, and
				security practices. Share insights on hardware wallets, multi-signature
				setups, and how you manage your Bitcoin transactions.
			</p>

			<h2 className="text-lg font-bold">Exchanges & Financial Services</h2>
			<p>
				Share your experience with Bitcoin exchanges, custodial services, and
				financial tools. Help us understand what matters most when choosing
				exchanges and how you use Bitcoin-based financial services.
			</p>

			<h2 className="text-lg font-bold">Lightning Network</h2>
			<p>
				Detail your experience with the Lightning Network, from wallets to node
				operation. Tell us about your use cases, from micropayments to routing,
				and any challenges you've encountered.
			</p>

			<h2 className="text-lg font-bold">Development Tools</h2>
			<p>
				For developers: share your experience with Bitcoin development tools,
				libraries, and frameworks. Help us understand which tools you rely on
				and what challenges you face.
			</p>

			<h2 className="text-lg font-bold">Nodes & Infrastructure</h2>
			<p>
				Tell us about your experience running Bitcoin nodes, from full nodes to
				Lightning nodes. Share insights on node management tools and self-hosted
				infrastructure.
			</p>

			<h2 className="text-lg font-bold">Mining</h2>
			<p>
				Share your involvement in Bitcoin mining, from home setups to industrial
				operations. Tell us about your hardware choices, pool preferences, and
				the challenges you face in mining operations.
			</p>

			<h2 className="text-lg font-bold">Privacy Tools</h2>
			<p>
				Share your experience with Bitcoin privacy tools like CoinJoin, Tor, and
				coin control. Help us understand how you use privacy-focused wallets and
				what challenges you face.
			</p>

			<h2 className="text-lg font-bold">Ordinals, Runes, NFTs, Art</h2>
			<p>
				Share your thoughts on Bitcoin's role in digital art and NFTs. Tell us
				about your experience with Ordinals, Runes, and how these new use cases
				align with Bitcoin's future.
			</p>

			<h2 className="text-lg font-bold">Conferences & Community</h2>
			<p>
				Tell us how you engage with the Bitcoin community through events,
				meetups, and online platforms. Share your preferred ways of staying
				informed about Bitcoin developments.
			</p>

			<h2 className="text-lg font-bold">Learning Resources</h2>
			<p>
				Help us identify the most valuable Bitcoin educational resources. Share
				which books, courses, and podcasts have helped you understand Bitcoin
				better.
			</p>

			<h2 className="text-lg font-bold">About You</h2>
			<p>
				Tell us about your Bitcoin journey, including your experience level and
				motivations. Your background helps us better understand the diverse
				needs of the Bitcoin community.
			</p>

			<div className="flex gap-4">
				<Button variant="default" asChild>
					<Link href="/survey/1">Continue to Survey</Link>
				</Button>
			</div>
		</section>
	);
}
