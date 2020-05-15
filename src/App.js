import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '@wordpress/block-library/build-style/style.css';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';
import logo from './logo.svg';

import data from './_setup.json';

import PageView from './pageView';
import PostList from './postList';
import PostView from './postView';

import Search from './autocomplete';


/**
 * Create all required page templates
 * 
 * @param {*} p 
 */

const template = {};

// Home
template['home'] = () => (
  <div>
    <PageView page={ data.url.slug_home } />
  </div>
);

// Post List
template['posts'] = () => (
  <div>
    <div className="page posts">
      <h1>Posts</h1>

      <PostList />
    </div>
  </div>
);

// 404
template['404'] = ({ location }) => (
  <div>
    <div className="page">
      <h3>404. Not Found. <code>{ location.pathname }</code></h3>
    </div>
  </div>
);


/**
 * App output
 */
const App = () => (
  <Router basename={ data.url.basename }>
    <div>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="/">
          <img src={ logo } alt="React SPA" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {
              data.menu.map(
                route => {
                  //console.log(route)
                  if ( route.children !== undefined ) {
                    return (
                      <Dropdown as={ NavItem }>
                        <Dropdown.Toggle as={ NavLink }>{ route.title }</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {
                            route.children.map(
                              child => (
                                <Dropdown.Item>
                                  <Link to={ child.path }>{ child.title }</Link>
                                </Dropdown.Item>
                              )
                            )
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    );
                  } else {
                    return (
                      <Nav.Item>
                        {
                          <Link to={ route.path } className="nav-link">{ route.title }</Link>
                        }
                      </Nav.Item>
                    );
                  }
                }
              )
            }
          </Nav>
          <Nav className="justify-content-end">
            <Search />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path={ '/' } component={ template[ 'home' ] } />
        <Route exact path={ '/signin/' } component={ template[ 'signin' ] } />
        <Route exact path={ '/' + data.url.slug_posts + '/:post' } component={ PostView } />
        <Route exact path={ '/' + data.url.slug_posts + '/' } component={ PostList } />
        <Route exact path={ '/:page' } component={ PageView } />
        <Route component={ template[ '404' ] } />
      </Switch>
    </div>
  </Router>
);

export default App;
