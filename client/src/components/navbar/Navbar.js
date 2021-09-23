import React from 'react'
import { Navbar as NavigationBar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Navbar.css';

function Navbar({categories}) {
    return (
        <>
        <NavigationBar className="navbar" expand="lg">
            <Container>
                <NavigationBar.Brand href="#home">
                    <img className="logo" src="/concordia.png" alt="Concordia Brand" />
                </NavigationBar.Brand>
                <NavigationBar.Toggle aria-controls="basic-navbar-nav" />
                <NavigationBar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto nav-links">
                <LinkContainer to='/home'>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <Nav.Link href="/category/ranks">Store</Nav.Link>
                <LinkContainer to='/vote'>
                    <Nav.Link >Vote</Nav.Link>
                </LinkContainer>
                </Nav>
                </NavigationBar.Collapse>
            </Container>
        </NavigationBar>
        </>
    )
}
export default Navbar;
