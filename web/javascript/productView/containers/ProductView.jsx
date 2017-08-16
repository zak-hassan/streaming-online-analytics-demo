import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  addProduct,
  removeProduct,
  clearProducts,
} from '../productActions'

class ProductView extends Component {
  static get propTypes(){
    return {
      cart: PropTypes.object,
    }
  }

  render() {

    let title = <h2 className="card-pf-title">Product Selection</h2>;
    let content = <p>content</p>;
    let footer = <p>footer</p>;

    return (
      <div className="col col-cards-pf container-cards-pf">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
              {title}
            <div className="card-pf-footer fader">
              {content}
            </div>
            <div className="container card-pf-footer card-pf">
              {footer}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProducts: (product) => {
      dispatch(addProduct(product))
    },
    removeProduct: (product) => {
      dispatch(removeProduct(product))
    },
    clearProducts: () => {
      dispatch(clearProducts())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)