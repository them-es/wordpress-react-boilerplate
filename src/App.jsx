import React, { Suspense, lazy, memo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";

import "./App.scss";
import logo from "./logo.svg";
import data from "./_setup.json";

// Lazy-loaded components
const PageHome = lazy(() => import("./components/pageHome"));
const PageNotFound = lazy(() => import("./components/pageNotFound"));
const PageView = lazy(() => import("./components/pageView"));
const PostList = lazy(() => import("./components/postList"));
const PostView = lazy(() => import("./components/postView"));
const Search = lazy(() => import("./components/autocomplete"));

const RouteLoading = () => <div className="content">Loading...</div>;

/**
 * Navigation Bar Component
 */
const AppNavbar = memo(() => (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" fixed="top" className="px-3">
        <Navbar.Brand href="/">
            <img src={logo} alt="React SPA" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {data.menu.map((route, i) =>
                    route.children ? (
                        <NavDropdown title={route.title} id={`dropdown-${route.id ?? i}`} key={route.id ?? i}>
                            {route.children.map((child, childIdx) => (
                                <NavDropdown.Item
                                    key={child.id ?? childIdx}
                                    as={Link}
                                    to={child.path}
                                >
                                    {child.title}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    ) : (
                        <Nav.Link key={route.id ?? i} as={Link} to={route.path}>
                            {route.title}
                        </Nav.Link>
                    )
                )}
            </Nav>
            <Nav className="justify-content-end">
                <Suspense fallback={null}>
                    <Search />
                </Suspense>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
));

/**
 * Main App Component
 */
const App = () => (
    <Router>
        <AppNavbar />
        <Suspense fallback={<RouteLoading />}>
            <Routes>
                <Route index element={<PageHome />} />
                <Route path={`/${data.url.slug_posts}`} element={<PostList />} />
                <Route path={`/${data.url.slug_posts}/:post`} element={<PostView />} />
                <Route path="/:page" element={<PageView />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    </Router>
);

export default App;