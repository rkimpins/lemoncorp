import React from 'react';
//import classes from './NavigationBar.module.css';
//import {Navbar, Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown';

import Logo from '../../images/Logo/lemoncorp_logo.png'

const NavigationBar = () => {
    /*
        <div className={classes.nav}>
            <h1>Logo</h1>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/portfolio">Portfolio</Link>
        </div>
    */
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Navbar.Brand href="/home">
                <img
                    src={Logo}
                    width="20%"
                    alt="Logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    <Nav.Link href="/resume">Resume</Nav.Link>
                    <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                    <NavDropdown title="Projects" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/War">War</NavDropdown.Item>
                        <NavDropdown.Item href="/BugElo">Bug Elo</NavDropdown.Item>
                        <NavDropdown.Item href="/Chopsticks">Chopsticks</NavDropdown.Item>
                        <NavDropdown.Item href="/IntegerSequences">Integer Sequences</NavDropdown.Item>
                        <NavDropdown.Item href="/Phase10">Phase 10</NavDropdown.Item>
                        <NavDropdown.Item href="/Voronoi">Voronoi</NavDropdown.Item>
                        <NavDropdown.Item href="/RandomColors">Random Colors</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
