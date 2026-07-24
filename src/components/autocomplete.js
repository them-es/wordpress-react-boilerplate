import React, { Component } from "react";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import Autocomplete from "./autocompleteResult";

import data from "../_setup.json";

class Search extends Component {
	state = {
		query: "",
		results: [],
	};

	getResult = async () => {
		// Fetch page with search "xyz": https://developer.wordpress.org/rest-api/reference/pages/
		await apiFetch({
			url:
				data.url.api +
				addQueryArgs("/wp/v2/pages", { search: this.state.query }),
		})
			.then((posts) => {
				this.setState({
					isLoading: false,
					results: posts, // Get first element from array
				});
			})
			.catch((error) => {
				this.setState({
					error,
					isLoading: false,
				});
			});
	};

	handleInputChange = () => {
		this.setState(
			{
				query: this.search.value,
			},
			() => {
				if (this.state.query && this.state.query.length > 1) {
					this.getResult();
					this.search.setAttribute("aria-expanded", "true");
				} else {
					this.setState({
						results: [],
					});
					this.search.setAttribute("aria-expanded", "false");
				}
			},
		);
	};

	handleInputFocus = () => {
		document.getElementById("autocomplete-result").style.display = "block";
	};

	handleInputBlur = () => {
		setTimeout(function () {
			document.getElementById("autocomplete-result").style.display =
				"none";
		}, 500);
	};

	render() {
		return (
			<form>
				<input
					className="form-control"
					placeholder="Search for..."
					ref={(input) => (this.search = input)}
					onChange={this.handleInputChange}
					onFocus={this.handleInputFocus}
					onBlur={this.handleInputBlur}
					role="combobox"
					aria-owns="autocomplete-result"
					aria-autocomplete="list"
					aria-expanded="false"
				/>
				<Autocomplete results={this.state.results} />
			</form>
		);
	}
}

export default Search;
