import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from '../../modal/components/ButtonModal.jsx';
import { ROUTES } from '../productConstants'

class Product extends Component {
  static get propTypes() {
    return {
      product: PropTypes.object,
      toggleModal: PropTypes.func,
      selectedProduct: PropTypes.object,
      selectProduct: PropTypes.func,
    }
  }

  constructor(){
    super();
    this.toggleModal = this.toggleModal.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
  }

  toggleModal(){
    this.props.toggleModal();
  }

  selectProduct(){
    this.props.selectProduct(this.props.product)
  }

  imageFormatter(filename) {
    const imageStyle = {
      width: '80px',
      height: '80px',
    };
    return <img className="img-thumb" src={ROUTES.images + filename} style={imageStyle}/>;
  }

  render() {
    let product = this.props.product;
    let image =  this.imageFormatter(this.props.product.image);
    let cartButtonContent = <span className="fa fa-shopping-cart fa-lg"
                                  onClick={this.selectProduct}/>;

    return (
      <div className="card-pf-body" style={{height: '261px'}}>
        <div className="card-pf-top-element aligner">{image}</div>
        <h2 className="card-pf-title text-center">{product.pname}</h2>
        <div className="card-pf-items text-center">
          <div className="card-pf-item">
            <span className="fa fa-usd"/>
            <span className="card-pf-item-text">{product.pprice}</span>
          </div>
          <div className="card-pf-item">
            <ButtonComponent toggleModal={this.props.toggleModal} content={cartButtonContent}/>
          </div>
        </div>
        <p className="card-pf-info text-center">Category: {product.ptype}</p>
      </div>
    )
  }

}

export default Product;