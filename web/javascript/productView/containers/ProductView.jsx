import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  addProduct,
  handleGETProducts,
  selectProduct,
} from '../productActions'
import { setMessage } from '../../message/messageActions'
import Products from '../components/products.jsx';
import { toggleCartModal } from '../../modal/modalActions';
import ModalComponentDialog from "../../modal/components/ModalWindow.jsx";
import { ROUTES } from '../productConstants'

class ProductView extends Component {
  static get propTypes(){
    return {
      cart: PropTypes.object,
      handleGETProducts: PropTypes.func,
      loadingProducts: PropTypes.bool,
      addProduct: PropTypes.func,
      toggleModal: PropTypes.func,
      selectedProduct: PropTypes.object,
      selectProduct: PropTypes.func,
      modalState: PropTypes.bool,
      products: PropTypes.object,
      setMessage: PropTypes.func,
    }
  }

  constructor(){
    super();
    this.closeModal = this.closeModal.bind(this);
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
    return <img className="img-thumb" src={ROUTES.images+filename} style={imageStyle}/>;
  }

  closeModal(){
    this.props.toggleModal();
  }

  addToCart(){
    this.props.addProduct(this.props.selectedProduct);
    this.closeModal();
    this.props.setMessage("Successfully added item to cart", "success");
  }

  createModalFooter(){
    return (
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.addToCart}>Add to Cart</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
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
        isOpen={this.props.modalState}
        toggleModal={this.props.toggleModal}
        modalTitle="Would you like to add this item to your cart?"
        modalContent={content}
        modalFooter={this.createModalFooter()}/>
    )
  }

  createFooter(){
    return (
      <a className="card-pf-link-with-icon" >
        <span className="pficon pficon-help"/>
        Help
      </a>
    )
  }

  createProducts(){
    return (
      <Products products={this.props.products}
                toggleModal={this.props.toggleModal}
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
            <div className="card-pf-footer card-pf">
              {this.createFooter()}
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
    modalState: state.modalReducer.add_to_cart_modal,
    selectedProduct: state.productReducer.selectedProduct,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => {
      dispatch(addProduct(product))
    },
    setMessage: (msg, type) => {
      dispatch(setMessage(msg, type))
    },
    handleGETProducts: () => {
      dispatch(handleGETProducts())
    },
    toggleModal: () => {
      dispatch(toggleCartModal())
    },
    selectProduct: (product) => {
      dispatch(selectProduct(product))
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)