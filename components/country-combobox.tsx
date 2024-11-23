"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import countries from "@/lib/countries";
import { useState } from "react";

interface CountryComboboxProps {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

export default function CountryCombobox({
	value,
	onChange,
	disabled,
}: CountryComboboxProps) {
	const [open, setOpen] = useState(false);

	const selectedCountry = countries.find((country) => country.code === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
					disabled={disabled}
				>
					{selectedCountry ? (
						<div className="flex items-center">
							<img
								src={`/flags/1x1/${selectedCountry.code}.svg`}
								alt={selectedCountry.name}
								className="w-5 h-5 mr-2 rounded-full border border-border"
							/>
							{selectedCountry.name}
						</div>
					) : (
						"Select country..."
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-max m-0 p-0">
				<Command>
					<CommandInput placeholder="Search country..." />
					<CommandList>
						<CommandEmpty>No country found.</CommandEmpty>
						<CommandGroup>
							{countries.map((country) => (
								<CommandItem
									key={country.code}
									value={country.name}
									onSelect={() => {
										onChange(country.code);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === country.code ? "opacity-100" : "opacity-0",
										)}
									/>
									<img
										src={`/flags/1x1/${country.code}.svg`}
										alt={country.name}
										className="w-5 h-5 mr-2 rounded-full border border-border"
									/>
									{country.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
