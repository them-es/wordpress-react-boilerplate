import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Autocomplete = ({ results = [] }) => {
	// Return null or a fallback message if there are no results
	if (!results.length) {
		return null;
	}

	return (
		<ListGroup id="autocomplete-result" as="ul">
			{results.map((post) => (
				<ListGroup.Item as="li" key={post.id || post.slug}>
					<Link to={`/${post.slug}`}>
						{post.title?.rendered || "Untitled"}
					</Link>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default Autocomplete;
