import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import Product from './product.jsx';

class Products extends Component{
  static get propTypes() {
    return {
      products: PropTypes.object,
      toggleModal: PropTypes.func,
      selectProduct: PropTypes.func,
    }
  }

  render(){
    let productKeys = Object.keys(this.props.products);
    let renderedProducts = productKeys.map((productID, i) => {
      return (
        <div key={i} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card-pf card-pf-view card-pf-view-select">
            <Product product={this.props.products[productID]}
                     toggleModal={this.props.toggleModal}
                     selectProduct={this.props.selectProduct}/>
          </div>
        </div>
      )
    });
    return (
      <div className="container-fluid container-cards-pf">
        <div className="row row-cards-pf">
          {renderedProducts}
        </div>
      </div>
    )

  }
}

export default Products;
