"use client";

import { useEffect } from "react";

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<section className="space-y-4">
			<div>
				<h1 className="text-3xl font-bold">Site Error</h1>
				<h2>Something went wrong.</h2>
			</div>
			<div className="text-sm">
				<p>Error:</p>
				<p>{error.message}</p>
			</div>
		</section>
	);
}
