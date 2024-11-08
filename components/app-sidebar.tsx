"use client";

import * as React from "react";
import { ChevronRight, GithubIcon, TwitterIcon } from "lucide-react";
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
import survey from "@/surveys/state-of-btc";

type NavItem = {
	title: string;
	defaultOpen: boolean;
	items: {
		title: string;
		url: string;
	}[];
};

const data = {
	versions: [
		{
			id: "xykjy2bwbbrnh73fmehdw",
			name: "State of Bitcoin",
			isDisabled: false,
		},
		{
			id: "gye7ja79tqi7wrfjhezmy",
			name: "State of Nostr (coming soon)",
			isDisabled: true,
		},
		{
			id: "mn9jaba7r846edfd783ep",
			name: "State of L2s (coming soon)",
			isDisabled: true,
		},
	],
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
				...survey.sections.map((section, index) => ({
					title: `${index + 1}) ${section.title}`,
					url: `/survey/${index + 1}`,
				})),
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
				<SidebarFooter className="flex flex-row justify-end items-end border-t">
					<Button variant="outline" size="icon" asChild>
						<Link href="https://x.com/bolander72" target="_blank">
							<TwitterIcon className="!h-5 !w-5" />
						</Link>
					</Button>
					<Button variant="outline" size="icon" asChild>
						<Link
							href="https://github.com/bolander72/stateofbtc.org"
							target="_blank"
						>
							<GithubIcon className="!h-5 !w-5" />
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
