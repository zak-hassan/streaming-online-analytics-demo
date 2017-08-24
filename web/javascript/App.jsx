import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import ModalComponentDialog from "./modal/components/ModalWindow.jsx";
import NavBar from "./navBar/components/NavBar.jsx";
import Message from "./message/components/Message.jsx";
import ProductView from "./productView/containers/ProductView.jsx";
import OrderView from "./orderView/containers/OrderView.jsx";
import OrderQueryView from "./orderQueryView/containers/OrderQueryView.jsx";
import { toggleShowCartModal } from './modal/modalActions';

import { clearMessage } from "./message/messageActions";

class App extends Component {

  static get propTypes() {
    return {
      message: PropTypes.string,
      messageType: PropTypes.string,
      icon: PropTypes.string,
      visible: PropTypes.bool,
      clearMessage: PropTypes.func,
      cart: PropTypes.object,
      toggleModal: PropTypes.func,
    }
  }

  createModal(){
    const btnStyle={boxShadow: 'none'};
    let cartCount = Object.keys(this.props.cart).length;
    let content =
      <div>
        You have <label>{cartCount}</label> items in your cart.
        Review your orders and checkout when you are ready for purchase.
      </div>;

    let footer =
      <div className="modal-footer">
        <a className="btn btn-secondary" style={btnStyle} href="/order">Review Orders</a>
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.toggleModal}>Close</button>
      </div>;

    return (
      <ModalComponentDialog
        isOpen={this.props.modalState}
        toggleModal={this.props.toggleModal}
        modalTitle="Proceed to checkout"
        modalContent={content}
        modalFooter={footer}/>
    )
  }

  render() {
    return (
        <Router>
          <div className="app">
            <NavBar cart={this.props.cart}
                    toggleModal={this.props.toggleModal}/>
            <Message message={this.props.message} messageType={this.props.messageType}
              icon={this.props.icon} visible={this.props.visible}
              clearMessage={this.props.clearMessage}/>
            <Switch>
               <Route exact path="/" component={ProductView}/>
            </Switch>
            <Switch>
               <Route exact path="/order" component={OrderView}/>
            </Switch>
            <Switch>
               <Route exact path="/query" component={OrderQueryView}/>
            </Switch>
            {this.createModal()}
          </div>
        </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.messageReducer.message,
    messageType: state.messageReducer.messageType,
    icon: state.messageReducer.icon,
    visible: state.messageReducer.visible,
    cart: state.productReducer.cart,
    modalState: state.modalReducer.show_cart_modal,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => {
      dispatch(clearMessage())
    },
    toggleModal: () => {
      dispatch(toggleShowCartModal())
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
