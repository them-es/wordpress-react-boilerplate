import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Autocomplete = ( props ) => {
  return <ListGroup id="autocomplete-result" as="ul">
    {
      props.results.map( ( post, i ) => (
        <ListGroup.Item as="li">
          <Link to={ '/' + post.slug }>{ post.title.rendered }</Link>
        </ListGroup.Item>
      ) )
    }
  </ListGroup>
}

export default Autocomplete;
