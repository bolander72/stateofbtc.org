import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { StoreProvider } from "@/components/providers/store-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { getSurveyMetadata } from "@/db/queries";

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const surveys = await getSurveyMetadata({
		withSectionMetadata: true,
	});

	return (
		<NuqsAdapter>
			<StoreProvider>
				<SidebarProvider>
					<AppSidebar surveys={surveys}>
						<main className="transition-[margin] duration-300 ease-in-out p-4 max-w-5xl w-full text-balance">
							{children}
						</main>
					</AppSidebar>
				</SidebarProvider>
			</StoreProvider>
		</NuqsAdapter>
	);
}
