import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalComponentDialog from "./lib/modal/containers/ModalWindow.jsx";
import ButtonModal from "./lib/modal/containers/ButtonModal.jsx";

import { VIEWS_CONFIG, NAVBAR_CONFIG, MODALS } from "./configs.jsx";

import { App } from "./lib/appContainer/App.jsx"

class AppWrapper extends Component {

  static get propTypes() {
    return {
      cart: PropTypes.object,
    }
  }

  _createModal(key){
    const btnStyle={boxShadow: 'none'};
    let cartCount = Object.keys(this.props.cart).length;
    let content =
      <div>
        You have <label>{cartCount}</label> items in your cart.
        Review your orders and checkout when you are ready for purchase.
      </div>;
    let reviewOrdersButton = <Link className="btn btn-secondary" style={btnStyle} to="/order"> Review Orders </Link>;
    let closeModalButton = <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>;
    let footer =
      <div className="modal-footer">
        <ButtonModal content={reviewOrdersButton} mid={MODALS.CART_MODAL}/>
        <ButtonModal content={closeModalButton} mid={MODALS.CART_MODAL}/>
      </div>;

    return (
      <ModalComponentDialog key={key} mid={MODALS.CART_MODAL} modalTitle="Proceed to checkout"
                            modalContent={content} modalFooter={footer}/>
    )
  }

  _createCustomNavUtility(){
    let cartCount = Object.keys(this.props.cart).length;

    // Cart link to appear top right of navbar
    let buttonContent =
      <ul className="nav navbar-nav navbar-utility">
        <li><a href="#">
          <i className="fa fa-shopping-cart" aria-hidden="true"/>
          {" "}
          Cart: {cartCount}
        </a>
        </li>
      </ul>;

    let navButtonList =
      <div key={1} className="collapse navbar-collapse navbar-collapse-1">
        <ButtonModal content={buttonContent} mid={MODALS.CART_MODAL}/>
      </div>;

    // Hamburger icon to collapse/uncollapse nav utility
    let collapseButton =
      <button key={0} type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"/>
        <span className="icon-bar"/>
        <span className="icon-bar"/>
      </button>;

    return [collapseButton, navButtonList, this._createModal(2)]
  }

  render() {
    return (
      <div>
        <App viewsConfig={VIEWS_CONFIG.CONFIG} navbarConfig={NAVBAR_CONFIG}
             customNavUtility={this._createCustomNavUtility()}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart,
  }
};

export default connect(mapStateToProps)(AppWrapper);
