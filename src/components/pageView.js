import React, { Component } from "react";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import { withRouter } from "./withRouter"; // https://stackoverflow.com/a/71043072

import PageLoading from "./pageLoading";

import data from "../_setup.json";

class PageView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			isLoading: true,
			posts: [],
			post: {},
		};
	}

	componentDidMount() {
		this.getPost(
			this.props.match.params.page
				? this.props.match.params.page
				: data.url.slug_home,
		);
	}

	componentDidUpdate(prevProps, prevState) {
		const slug_new =
			this.props.match !== undefined
				? this.props.match.params.page
				: this.props.page !== undefined
					? this.props.page
					: data.url.slug_home;

		if (prevState.slug !== slug_new) {
			this.getPost(slug_new);

			this.setState({
				slug: slug_new,
			});
		}
	}

	getPost = async (s) => {
		// Fetch page with slug "xyz": https://developer.wordpress.org/rest-api/reference/pages/
		await apiFetch({
			url: data.url.api + addQueryArgs("/wp/v2/pages", { slug: s }),
		})
			.then((posts) => {
				//console.log(posts);

				this.setState({
					isLoading: false,
					post: posts[0], // Get first element from array
				});
			})
			.catch((error) => {
				this.setState({
					error,
					isLoading: false,
				});
			});
	};

	render() {
		const { post, error, isLoading } = this.state;

		if (error) {
			return <div className="content error">Error: {error.message}</div>;
		} else if (isLoading) {
			return (
				<div>
					<PageLoading />
				</div>
			);
		} else if (post) {
			return (
				<div className="content">
					<h1
						dangerouslySetInnerHTML={{
							__html: post.title.rendered,
						}}
					/>
					<div
						dangerouslySetInnerHTML={{
							__html: post.content.rendered,
						}}
					/>
				</div>
			);
		} else {
			return <div className="content 404">404 - Not found!</div>;
		}
	}
}

export default withRouter(PageView);
