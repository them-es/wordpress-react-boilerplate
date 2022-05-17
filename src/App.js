import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Dropdown } from 'react-bootstrap';

import '@wordpress/block-library/build-style/style.css';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';
import logo from './logo.svg';

import data from './_setup.json';

import PageHome from './components/pageHome';
import PageNotFound from './components/pageNotFound';
import PageView from './components/pageView';
import PostList from './components/postList';
import PostView from './components/postView';
import Search from './components/autocomplete';


/**
 * App output
 */
const App = () => (
  <Router basename={ data.url.basename }>
    <div>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" fixed="top" className="px-3">
        <Navbar.Brand href="/">
          <img src={ logo } alt="React SPA" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
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

      <Routes>
        <Route index element={ <PageHome /> } />
        <Route path={ '/' + data.url.slug_posts + '/' } element={ <PostList /> } />
        <Route path={ '/' + data.url.slug_posts + '/:post' } element={ <PostView /> } />
        <Route path={ '/:page' } element={ <PageView /> } />
        <Route path="*" element={ <PageNotFound /> } />
      </Routes>
    </div>
  </Router>
);

export default App;
