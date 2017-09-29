import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  addProduct,
  handleGETProducts,
  selectProduct,
} from '../productActions'
import { setMessageWithTimeout } from '../../lib/message/messageActions'
import Products from '../components/products.jsx';
import ModalComponentDialog from "../../lib/modal/containers/ModalWindow.jsx";
import { ROUTES } from '../productConstants'
import ButtonModal from "../../lib/modal/containers/ButtonModal.jsx";
import { MODALS } from "../../configs.jsx";


class ProductView extends Component {
  static get propTypes(){
    return {
      cart: PropTypes.object,
      handleGETProducts: PropTypes.func,
      loadingProducts: PropTypes.bool,
      addProduct: PropTypes.func,
      selectedProduct: PropTypes.object,
      selectProduct: PropTypes.func,
      products: PropTypes.object,
      setMessageWithTimeout: PropTypes.func,
    }
  }

  constructor(){
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  componentWillMount(){
    this.props.handleGETProducts();
  }

  imageFormatter(filename) {
    const imageStyle = {
      width: '80px',
      height: '80px',
    };
    return <img className="img-thumb" src={ROUTES.IMAGES+filename} style={imageStyle}/>;
  }

  addToCart(){
    this.props.addProduct(this.props.selectedProduct);
    this.props.setMessageWithTimeout("Successfully added item to cart", "success");
  }

  createModalFooter(){
    let addButton = <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.addToCart}>Add to Cart</button>;
    let closeButton = <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>;
    return (
      <div className="modal-footer">
        <ButtonModal mid={MODALS.PRODUCT_MODAL} content={addButton}/> <ButtonModal mid={MODALS.PRODUCT_MODAL}  content={closeButton}/>
      </div>
    )
  }

  createModal(){
    let content = <div>content</div>;
    let containerStyle = {width: 'auto'};
    if(this.props.selectedProduct){
      let product = this.props.selectedProduct;
      let productImage = this.imageFormatter(product.image);
      content =
        <div className="container" style={containerStyle}>
          <div className="col-sm-3 aligner">
            <div className="">{productImage}</div>
          </div>
          <div className="col-sm-6">
            <h2 className="card-pf-title">{product.pname}</h2>
            <div className="card-pf-item">
              <span className="fa fa-usd"/>
              <span className="card-pf-item-text"> {product.pprice}</span>
            </div>
            <div className="card-pf-item">
              <span>Category: </span>
              <span>{product.ptype}</span>
            </div>
          </div>
        </div>
    }

    return (
      <ModalComponentDialog
        mid={MODALS.PRODUCT_MODAL}
        modalTitle="Would you like to add this item to your cart?"
        modalContent={content}
        modalFooter={this.createModalFooter()}/>
    )
  }

  createProducts(){
    return (
      <Products products={this.props.products}
                mid={MODALS.PRODUCT_MODAL}
                selectProduct={this.props.selectProduct}/>
    )
  }

  render() {
    let title = <h2 className="card-pf-title">Product Selection</h2>;
    let content = null;

    // Ensure products are loaded when rendering content
    if (this.props.loadingProducts === false){
      content = this.createProducts();
    }
    return (
      <div className="col col-cards-pf container-cards-pf fader">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
            {title}
            <div className="card-pf-footer ">
              {content}
              {this.createModal()}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart,
    products: state.productReducer.products,
    loadingProducts: state.productReducer.loadingProducts,
    selectedProduct: state.productReducer.selectedProduct,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => {
      dispatch(addProduct(product))
    },
    setMessageWithTimeout: (msg, type) => {
      dispatch(setMessageWithTimeout(msg, type))
    },
    handleGETProducts: () => {
      dispatch(handleGETProducts())
    },
    selectProduct: (product) => {
      dispatch(selectProduct(product))
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
