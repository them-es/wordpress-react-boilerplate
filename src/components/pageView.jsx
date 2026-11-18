import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import PageLoading from "./pageLoading";
import data from "../_setup.json";

/**
 * Custom hook for fetching WordPress pages by slug
 */
function useFetchPage(slug) {
    const [state, setState] = useState({ page: null, isLoading: true, error: null });

    useEffect(() => {
        let isCancelled = false;

        // Reset state when slug changes
        setState({ page: null, isLoading: true, error: null });

        const fetchPost = async () => {
            try {
                const apiUrl = addQueryArgs(
                    `${data.url.api}/wp/v2/pages`,
                    { slug }
                );

                const pages = await apiFetch({ url: apiUrl });

                if (!isCancelled) {
                    setState({
                        page: pages?.[0] || null,
                        isLoading: false,
                        error: null,
                    });
                }
            } catch (err) {
                if (!isCancelled) {
                    setState({
                        page: null,
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
 * Renders a single page with title and content
 */
function PageContent({ page }) {
    return (
        <div className="content">
            <h1 dangerouslySetInnerHTML={{ __html: page.title?.rendered || "" }} />
            <div dangerouslySetInnerHTML={{ __html: page.content?.rendered || "" }} />
        </div>
    );
}

export default function PageView({ pageOverride }) {
    const { page: urlSlug } = useParams();
    const activeSlug = urlSlug || pageOverride || data.url.slug_home;
    const { page, isLoading, error } = useFetchPage(activeSlug);

    if (isLoading) {
        return <PageLoading />;
    }

    if (error) {
        return (
            <div className="content error">
                Error: {error.message || "An error occurred while fetching the page."}
            </div>
        );
    }

    if (!page) {
        return <div className="content error-404">404 - Not found!</div>;
    }

    return <PageContent page={page} />;
}