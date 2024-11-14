import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { StoreProvider } from "@/components/providers/store-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<NuqsAdapter>
			<StoreProvider>
				<SidebarProvider>
					<AppSidebar>
						<main className="transition-[margin] duration-300 ease-in-out p-4 max-w-5xl w-full text-balance">
							{children}
						</main>
					</AppSidebar>
				</SidebarProvider>
			</StoreProvider>
		</NuqsAdapter>
	);
}
