"use client";

import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Link } from "next-view-transitions";

export function VersionSwitcher({
	versions,
	defaultVersion,
}: {
	versions: {
		id: string;
		title: string;
		isDisabled: boolean;
	}[];
	defaultVersion: {
		id: string;
		title: string;
		isDisabled: boolean;
	};
}) {
	const [selectedVersion, setSelectedVersion] = useState(defaultVersion);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-secondary">
								<GalleryVerticalEnd className="size-4" />
							</div>
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-semibold">{selectedVersion.title}</span>
								<span className="text-xs">
									id: {selectedVersion.id.slice(0, 6)}...
									{selectedVersion.id.slice(-3)}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width]"
						align="start"
					>
						{versions.map((version) => (
							<DropdownMenuItem
								key={version.id}
								onSelect={() => {
									setSelectedVersion(version);
								}}
								disabled={version.isDisabled}
								asChild
								className="cursor-pointer"
							>
								<Link href={`/${selectedVersion.id}`}>
									{version.title}{" "}
									{version.id === selectedVersion.id && (
										<Check className="ml-auto" />
									)}
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
