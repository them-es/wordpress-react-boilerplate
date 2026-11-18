import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import PageLoading from "./pageLoading";
import data from "../_setup.json";

/**
 * Custom hook for fetching WordPress posts by slug
 */
function useFetchPost(slug) {
	const [state, setState] = useState({
		post: null,
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		let isCancelled = false;

		// Reset state when slug changes
		setState({ post: null, isLoading: true, error: null });

		const fetchPost = async () => {
			try {
				const apiUrl = addQueryArgs(`${data.url.api}/wp/v2/posts`, {
					slug,
				});

				const posts = await apiFetch({
					url: apiUrl,
				});

				setState({
					post: posts?.[0] || null,
					isLoading: false,
					error: null,
				});
			} catch (err) {
				if (!isCancelled) {
					setState({
						post: null,
						isLoading: false,
						error: err,
					});
				}
			}
		};

		fetchPost();

		// Cleanup to prevent state updates if component unmounts or slug changes
		return () => {
			isCancelled = true;
		};
	}, [slug]);

	return state;
}

/**
 * Renders a single post with metadata and navigation
 */
function PostContent({ post }) {
	const formattedDate = new Date(post.date).toLocaleDateString(
		data.format.date.locale,
		data.format.date.options,
	);

	return (
		<div className="content post">
			<div>
				<Link
					to={`/${data.url.slug_posts}/`}
					className="btn btn-outline-secondary"
				>
					Go back to Posts
				</Link>
			</div>
			<hr />
			<div>
				<small>{formattedDate}</small>
			</div>
			<h1 dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
			<div dangerouslySetInnerHTML={{ __html: post.content?.rendered }} />
		</div>
	);
}

export default function PostView() {
	const { post: postSlug = "404" } = useParams();
	const { post, isLoading, error } = useFetchPost(postSlug);

	if (isLoading) {
		return <PageLoading />;
	}

	if (error) {
		return (
			<div className="content error">
				Error: {error.message || "An error occurred."}
			</div>
		);
	}

	if (!post) {
		return <div className="content error-404">404 - Post not found!</div>;
	}

	return <PostContent post={post} />;
}
