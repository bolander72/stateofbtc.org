import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<NuqsAdapter>
			<SidebarProvider>
				<AppSidebar>
					<main className="transition-[margin] duration-300 ease-in-out p-4 max-w-2xl w-full text-balance">
						{children}
					</main>
				</AppSidebar>
			</SidebarProvider>
		</NuqsAdapter>
	);
}
