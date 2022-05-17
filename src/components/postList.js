import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { wp } from '../wpAPI';

import data from '../_setup.json';

import PageLoading from './pageLoading';


// Date Format: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

class PostList extends React.Component {

  constructor( props ) {

    super( props );

    this.state = {
      error: null,
      isLoading: true,
      posts: [],
      postsperpage: 10,
      currentpage: 1,
      totalpages: null,
    };

    this.loadMore = this.loadMore.bind( this );

  }

  loadMore() {

    this.setState( ( prev ) => {
      return { currentpage: prev.currentpage + 1 };
    } );

    this.getPosts( this.state.currentpage );
  }

  componentDidMount() {

    // Load initial
    this.loadMore();

  }

  getPosts = currentpage => {
    //console.log(currentpage);

    // Fetch posts: http://wp-api.org/node-wpapi/using-the-client/#api-query-parameters
    wp.posts().perPage( this.state.postsperpage ).page( currentpage )
      .then( posts => {
        //console.log(posts);

        // Append post data to existing posts
        if ( currentpage === 1 ) {
          this.setState({
            isLoading: false,
            posts: posts,
            totalpages: posts._paging.totalPages,
          })
        } else {
          let existingposts = this.state.posts;
          this.setState({
            isLoading: false,
            posts: existingposts.concat( posts ),
          })
        }
      })
      .catch( error => {
        this.setState( {
          error,
          isLoading: false,
        } )
      } );
  }

  render() {

    const { posts, post, error, isLoading } = this.state;

    if ( error ) {

      return <div className="content">Error: { error.message }</div>;

    } else if ( isLoading ) {

      return (
        <div>
          <PageLoading />
        </div>
      );

    } else if ( posts !== [] ) {

      return (
        <div className="content">
          <h1>Posts</h1>
          <div className="list-group">
            {
              posts.map( post => (
                <Link key={ post.id } to={ post.slug } className="list-group-item list-group-item-action">
                  <h2 dangerouslySetInnerHTML={ { __html: post.title.rendered } } />
                  <div><small>{ new Date( post.date ).toLocaleDateString( data.format.date.locale, data.format.date.options ) }</small></div>
                </Link>
              ))
            }
          </div>
          {
            this.state.currentpage <= this.state.totalpages &&
            <button onClick={ this.loadMore } type="button" className="btn btn-primary d-block my-5 mx-auto">Load more</button>
          }
        </div>
      );

    } else {

      return <div className="content">Nothing to view!</div>;

    }

  }

}

export default PostList;
