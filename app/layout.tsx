import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "State of Bitcoin",
	description: "The definitive annual Bitcoin ecosystem survey",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
			>
				<SidebarProvider>
					<AppSidebar>
						<main className="transition-[margin] duration-300 ease-in-out p-4 max-w-2xl w-full text-balance">
							{children}
						</main>
					</AppSidebar>
				</SidebarProvider>
			</body>
		</html>
	);
}
