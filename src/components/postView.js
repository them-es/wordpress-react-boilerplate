import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { wp } from '../wpAPI';
import { withRouter } from './withRouter'; // https://stackoverflow.com/a/71043072

import data from '../_setup.json';

import PageLoading from './pageLoading';


class PostView extends React.Component {

  constructor( props ) {
    super( props );

    this.state = {
      error: null,
      isLoading: true,
      posts: [],
      post: {},
    };
  }

  componentDidMount() {
    this.getPost( this.props.match.params.post ? this.props.match.params.post : '404' );
  }

  getPost = ( s ) => {
    // Fetch post with slug "xyz": http://wp-api.org/node-wpapi/using-the-client/#api-query-parameters
    wp.posts().slug( s )
      .then( posts => {
        //console.log(posts);
        
        this.setState( {
          isLoading: false,
          post: posts[ 0 ], // Get first element from array
        } )
      } )
      .catch( error => {
        this.setState( {
          error,
          isLoading: false,
        } )
      } );
  }

  render() {
    const { post, error, isLoading } = this.state;

    if ( error ) {

      return <div className="content error">Error: { error.message }</div>;

    } else if ( isLoading ) {

      return (
        <div>
          <PageLoading />
        </div>
      );

    } else if ( post !== null ) {

      return (
        <div className="content post">
          <div><Link to={ '/' + data.url.slug_posts + '/' } className="btn btn-outline-secondary">Go back to Posts</Link></div>
          <hr />
          <div><small>{ new Date( post.date ).toLocaleDateString( data.format.date.locale, data.format.date.options ) }</small></div>
          <h1 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
          <div dangerouslySetInnerHTML={ { __html: post.content.rendered } } />
        </div>
      );

    } else {

      return <div className="content 404">404 - Not found!</div>;

    }
  }

}

export default withRouter( PostView );
