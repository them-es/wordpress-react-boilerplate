import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';


const Autocomplete = (props) => {
  const listitems = props.results.map((post, i) => (
    <ListGroup.Item as="li" role="option" tabindex="0">
      <Link key={post.id} to={'/' + post.slug}>{post.title.rendered}</Link>
    </ListGroup.Item>
  ));

  return <ListGroup id="autocomplete-result" as="ul" role="listbox" tabindex="-1">{listitems}</ListGroup>
}

export default Autocomplete;