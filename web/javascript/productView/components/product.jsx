import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from '../../lib/modal/containers/ButtonModal.jsx';
import { ROUTES } from '../productConstants'

class Product extends Component {
  static get propTypes() {
    return {
      product: PropTypes.object,
      mid: PropTypes.string,
      selectedProduct: PropTypes.object,
      selectProduct: PropTypes.func,
    }
  }

  constructor(){
    super();
    this.selectProduct = this.selectProduct.bind(this);
  }

  selectProduct(){
    this.props.selectProduct(this.props.product)
  }

  imageFormatter(filename) {
    return <img className="img-thumb" src={ROUTES.IMAGES + filename}/>;
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
            <ButtonComponent mid={this.props.mid} content={cartButtonContent}/>
          </div>
        </div>
        <p className="card-pf-info text-center">Category: {product.ptype}</p>
      </div>
    )
  }

}

export default Product;
