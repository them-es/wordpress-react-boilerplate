import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { wp } from './wpAPI';

import data from './_setup.json';

import PageLoading from './pageLoading';


// Date Format: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

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
    const slug = this.props.match.params.post;

    this.getPost( slug );
  }

  getPost = slug => {
    //console.log(slug);

    // Fetch post with slug "xyz": http://wp-api.org/node-wpapi/using-the-client/#api-query-parameters
    wp.posts().slug( slug )
      .then( posts => {
        //console.log(posts);
        
        this.setState({
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

      return <div className="content">Error: { error.message }</div>;

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

      return <div className="content">Nothing to view!</div>;

    }

  }

}

export default PostView;
