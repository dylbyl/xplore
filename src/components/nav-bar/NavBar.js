import React, { Component } from "react";
import "./NavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"

class NavBar extends Component {
  render() {
    return (
      <header>
        <Navbar bg="success" variant="dark">
          <Navbar.Brand href="/">xplore</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dash">Dashboard</Nav.Link>
            <Nav.Link href="/saved">Saved</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
        </Navbar>
      </header>
    );
  }
}

export default NavBar;