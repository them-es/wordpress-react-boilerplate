import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import PageLoading from "./pageLoading";
import data from "../_setup.json";

/**
 * Custom hook for fetching paginated WordPress posts
 */
function useFetchPosts() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasFetched, setHasFetched] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isCancelled = false;

		async function fetchPosts() {
			if (page === 1) {
				setIsLoading(true);
			} else {
				setIsFetchingMore(true);
			}
			setError(null);

			try {
				const path = addQueryArgs("/wp/v2/posts", {
					per_page: data.posts_per_page,
					page,
				});

				const response = await apiFetch({
					url: `${data.url.api}${path}`,
					parse: false,
				});

				const newPosts = await response.json();
				const totalPagesHeader = parseInt(
					response.headers.get("X-WP-TotalPages"),
					10,
				);

				setPosts((prev) =>
					page === 1 ? newPosts : [...prev, ...newPosts],
				);
				if (totalPagesHeader) {
					setTotalPages(totalPagesHeader);
				}
			} catch (err) {
				if (!isCancelled) {
					setError(err);
				}
			} finally {
				setIsLoading(false);
				setIsFetchingMore(false);
				setHasFetched(true);
			}
		}

		fetchPosts();

		// Cleanup to prevent state updates if component unmounts
		return () => {
			isCancelled = true;
		};
	}, [page]);

	const loadMore = useCallback(() => {
		if (!isFetchingMore && (!totalPages || page < totalPages)) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [isFetchingMore, totalPages, page]);

	return {
		posts,
		page,
		totalPages,
		isLoading,
		isFetchingMore,
		error,
		loadMore,
	};
}

/**
 * Single post item
 */
function PostItem({ post }) {
	const formattedDate = new Date(post.date).toLocaleDateString(
		data.format.date.locale,
		data.format.date.options,
	);

	return (
		<Link
			to={`./${post.slug}`}
			className="list-group-item list-group-item-action"
		>
			<h2
				dangerouslySetInnerHTML={{ __html: post.title?.rendered ?? "" }}
			/>
			<div>
				<small>{formattedDate}</small>
			</div>
		</Link>
	);
}

/**
 * Main Posts Page Component
 */
export default function PostList() {
	const {
		posts,
		page,
		totalPages,
		isLoading,
		hasFetched,
		isFetchingMore,
		error,
		loadMore,
	} = useFetchPosts();

	if (error) {
		return (
			<div className="content">
				Error: {error.message || "Failed to load posts"}
			</div>
		);
	}

	if (isLoading) {
		return <PageLoading />;
	}

	if (!isLoading && hasFetched && posts.length === 0) {
		return <div className="content">Nothing to view!</div>;
	}

	const hasMore = totalPages ? page < totalPages : false;

	return (
		<div className="content">
			<h1>Posts</h1>
			<div className="list-group">
				{posts.map((post) => (
					<PostItem key={post.id} post={post} />
				))}
			</div>

			{hasMore && (
				<button
					onClick={loadMore}
					disabled={isFetchingMore}
					type="button"
					className="btn btn-primary d-block my-5 mx-auto"
				>
					{isFetchingMore ? "Loading..." : "Load more"}
				</button>
			)}
		</div>
	);
}
