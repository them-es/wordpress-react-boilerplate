import React, { useState, useEffect } from "react";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import Autocomplete from "./autocompleteResult";
import data from "../_setup.json";

export default function Search() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (query.trim().length <= 1) {
			setResults([]);
			setIsLoading(false);
			return;
		}

		const controller = new AbortController();
		const timer = setTimeout(async () => {
			setIsLoading(true);
			setError(null);

			try {
				// Fetch posts and pages in parallel
				const [posts, pages] = await Promise.all([
					apiFetch({
						url: addQueryArgs(`${data.url.api}/wp/v2/posts`, {
							search: query,
						}),
						signal: controller.signal,
					}),
					apiFetch({
						url: addQueryArgs(`${data.url.api}/wp/v2/pages`, {
							search: query,
						}),
						signal: controller.signal,
					}),
				]);

				// Combine both arrays into one search results array
				const combinedResults = [...posts, ...pages];
				setResults(combinedResults);
			} catch (err) {
				if (err.name !== "AbortError") {
					setError(err);
				}
			} finally {
				setIsLoading(false);
			}
		}, 300);

		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	}, [query]);

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<input
				type="text"
				className="form-control"
				placeholder="Search for..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setTimeout(() => setIsFocused(false), 200)}
				role="combobox"
				aria-controls="autocomplete-result"
				aria-autocomplete="list"
				aria-expanded={isFocused && results.length > 0}
			/>

			{isFocused && (
				<div id="autocomplete-result">
					<Autocomplete
						results={results}
						isLoading={isLoading}
						error={error}
					/>
				</div>
			)}
		</form>
	);
}
