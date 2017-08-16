import React, { Component } from "react";
import { NavItem, Navbar, Nav } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

class NavBar extends Component {

  render() {
    return (
      <Navbar className="navbar-default navbar-pf">
        <Navbar.Header>
          <Navbar.Toggle/>
          <Link className="navbar-brand" to="/">
            <img alt="Streaming-online-analytics-demo"/>
          </Link>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="navbar-primary navbar-nav">
            <IndexLinkContainer to="/" activeHref="active">
              <NavItem>Product selection</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/order" activeHref="active">
              <NavItem>Your order</NavItem>
            </LinkContainer>
            <LinkContainer to="/query" activeHref="active">
              <NavItem>Query orders</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
