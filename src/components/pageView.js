import React, { Component } from 'react';
import { wp } from '../wpAPI';
import { withRouter } from './withRouter'; // https://stackoverflow.com/a/71043072

import data from '../_setup.json';

import PageLoading from './pageLoading';


class PageView extends React.Component {

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
    this.getPost( this.props.match.params.page ? this.props.match.params.page : data.url.slug_home );
  }

  componentDidUpdate( prevProps, prevState ) {
    const slug_new = ( this.props.match !== undefined ? this.props.match.params.page : ( this.props.page !== undefined ? this.props.page : data.url.slug_home ) );

    if ( prevState.slug !== slug_new ) {
      this.getPost( slug_new );

      this.setState({
        slug: slug_new,
      } );
    }
  }

  getPost = ( s ) => {
    // Fetch page with slug "xyz": http://wp-api.org/node-wpapi/using-the-client/#api-query-parameters
    wp.pages().slug( s )
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
        <div className="content">
          <h1 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
          <div dangerouslySetInnerHTML={ { __html: post.content.rendered } } />
        </div>
      );

    } else {

      return <div className="content 404">404 - Not found!</div>;

    }

  }

}

export default withRouter( PageView );
