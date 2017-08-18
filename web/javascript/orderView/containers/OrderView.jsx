import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateTotal } from "../orderActions"
import { checkout } from "../orderActions"
import { removeProduct } from "../../productView/productActions";
import CheckoutItem from "../components/CheckoutItem.jsx";


class OrderView extends Component {

  static get propTypes() {
    return {
      cart: PropTypes.object,
      updateTotal: PropTypes.func,
      checkout: PropTypes.func,
      removeProduct: PropTypes.func,
      total: PropTypes.string,
      quant: PropTypes.string
    }
  }

  checkout() {
    this.props.checkout(this.props.cart);
  }

  render() {
    let items, id;
    if(this.props.cart.length > 0) {
      for(id in this.props.cart) {
          let item = this.props.cart(id);
          items += <CheckoutItem key={id} name={item.productName}
          price={item.productPrice} category={item.productCategory}
          quant={item.quantity} removeProduct={this.props.removeProduct}/>
      }
    }
    return (
      <div className="container-fluid">
        <div className="list-group list-view-pf list-view-pf-view">
          {items}
        </div>
        <button className="btn btn-default" onClick={this.checkout.bind(this)}>Checkout</button>
        {this.props.total}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart,
    total: state.productReducer.total
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTotal: (amountBy) => {
      dispatch(updateTotal(amountBy))
    },
    checkout: (cart) => {
      dispatch(checkout(cart))
    },
    removeProduct: (id) => {
      dispatch(removeProduct(id))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
