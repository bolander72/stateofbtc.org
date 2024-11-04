"use client";

import * as React from "react";
import { ChevronRight, GithubIcon } from "lucide-react";
import { VersionSwitcher } from "@/components/version-switcher";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
	SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

type NavItem = {
	title: string;
	defaultOpen: boolean;
	items: {
		title: string;
		url: string;
	}[];
};

const data = {
	versions: ["2.11.2024"],
	navMain: [
		{
			title: "General",
			defaultOpen: true,
			items: [
				{
					title: "Home",
					url: "/",
				},
				{
					title: "About",
					url: "/about",
				},
			],
		},
		{
			title: "Survey",
			defaultOpen: true,
			items: [
				{
					title: "Introduction",
					url: "/survey",
				},
				{
					title: "1) Features",
					url: "/survey/1",
				},
				{
					title: "2) Wallets",
					url: "/survey/2",
				},
				{
					title: "3) Exchanges & Fintech",
					url: "/survey/3",
				},
				{
					title: "4) Lightning Network",
					url: "/survey/4",
				},
				{
					title: "5) Development Tools",
					url: "/survey/5",
				},
				{
					title: "6) Nodes & Infrastructure",
					url: "/survey/6",
				},
				{
					title: "7) Mining",
					url: "/survey/7",
				},
				{
					title: "8) Privacy Tools",
					url: "/survey/8",
				},
				{
					title: "9) Ordinals, Runes, NFTs, Art",
					url: "/survey/9",
				},
				{
					title: "10) Conferences & Community",
					url: "/survey/10",
				},
				{
					title: "11) Learning Resources",
					url: "/survey/11",
				},
				{
					title: "12) About You",
					url: "/survey/12",
				},
				{
					title: "Conclusion",
					url: "/survey/conclusion",
				},
			],
		},
	] as NavItem[],
};

function findBreadcrumbPath(
	navItems: NavItem[],
	pathname: string,
): { parent: string; current: string } | null {
	for (const parent of navItems) {
		// Check if any child item's URL matches the current pathname
		const matchingItem = parent.items?.find((item) => item.url === pathname);
		if (matchingItem) {
			return {
				parent: parent.title,
				current: matchingItem.title,
			};
		}
	}
	return null;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const breadcrumbInfo = findBreadcrumbPath(data.navMain, pathname);

	return (
		<>
			<Sidebar {...props}>
				<SidebarHeader className="border-b -mt-px">
					<VersionSwitcher
						versions={data.versions}
						defaultVersion={data.versions[0]}
					/>
					{/* <SearchForm /> */}
				</SidebarHeader>
				<SidebarContent className="gap-0">
					{data.navMain.map((item) => (
						<Collapsible
							key={item.title}
							title={item.title}
							defaultOpen={item.defaultOpen}
							className="group/collapsible"
						>
							<SidebarGroup>
								<SidebarGroupLabel
									asChild
									className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
								>
									<CollapsibleTrigger>
										{item.title}{" "}
										<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent>
									<SidebarGroupContent>
										<SidebarMenu>
											{item.items.map((item) => (
												<SidebarMenuItem key={item.title}>
													<SidebarMenuButton
														asChild
														isActive={item.url === pathname}
													>
														<Link href={item.url}>{item.title}</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					))}
				</SidebarContent>
				<SidebarRail />
				<SidebarFooter className="flex items-end">
					<Button variant="ghost" size="icon" asChild>
						<Link
							href="https://github.com/bolander72/stateofbtc.org"
							target="_blank"
						>
							<GithubIcon />
						</Link>
					</Button>
				</SidebarFooter>
			</Sidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b sticky top-0 bg-background z-50">
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbInfo && (
									<>
										<BreadcrumbItem className="block">
											{breadcrumbInfo.parent}
										</BreadcrumbItem>
										<BreadcrumbSeparator className="block" />
										<BreadcrumbItem>
											<BreadcrumbPage>{breadcrumbInfo.current}</BreadcrumbPage>
										</BreadcrumbItem>
									</>
								)}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				{props.children}
			</SidebarInset>
		</>
	);
}
