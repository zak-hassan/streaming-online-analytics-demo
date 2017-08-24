import React, { Component } from "react";
import { NavItem, Navbar, Nav } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


class NavBar extends Component {
  static get propTypes() {
    return {
      cart: PropTypes.object,
      toggleModal: PropTypes.func,
    }
  }

  render() {
    let cartCount = Object.keys(this.props.cart).length;
    const countStyle = {
      margin: '10px',
    };
    return (
      <Navbar className="navbar-default navbar-pf" >
        <Navbar.Header>
          <Navbar.Toggle/>
          <Link className="navbar-brand" to="/">
            <img alt="Streaming-online-analytics-demo"/>
          </Link>
        </Navbar.Header>
        <Navbar.Collapse>
          {/* navbar-primary className removed temp */}
          <Nav className="navbar-nav" >
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
          <Nav pullRight>
            <NavItem href="#" className="cart-link" onSelect={this.props.toggleModal}>
              <i className="fa fa-shopping-cart fa" aria-hidden="true"/>{"   "}Cart:
              <span className="cart-nav-count">{cartCount}</span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
