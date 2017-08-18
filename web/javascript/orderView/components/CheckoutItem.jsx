import React, { Component } from "react";
import PropTypes from "prop-types";

class CheckoutItem extends Component {

  static get propTypes() {
    return {
      name: PropTypes.String,
      quant: PropTypes.String,
      id: PropTypes.String,
      category: PropTypes.String,
      price: PropTypes.String,
      updateTotal: PropTypes.func,
      removeProduct: PropTypes.func
    }
  }

  componentWillUpdate(nextProp) {
    if((nextProp.quant) !== this.prop.quant){
      this.setState({oldQuant:this.prop.quant});
    }
  }

  update() {
    this.props.updateTotal((this.props.quant - this.state.oldQuant)
      * this.props.price);
    if(this.props.quant == 0){
      this.props.removeProduct(this.props.id);
    }
  }

  render() {
    return (
      <div className="list-group-item">
        <div className="list-view-pf-main-info">
          <div className="list-view-pf-left">
            <div className="list-view-pf-checkbox">
              <input type="checkbox"/>
            </div>
          </div>
          <div className="list-view-pf-body">
            <div className="list-view-pf-description">
              <div className="list-group-item-heading">
                <img src={"/images/" + this.props.id}/>
              </div>
              <div className="list-group-item-heading">
                {this.props.category} - {this.props.name}
              </div>
              <div className="list-group-item-text">
                {this.props.price} x
                <input type="text" value={this.props.quant}/>
              </div>
            </div>
              <div className="list-view-pf-actions">
                <button className="btn btn-default" onClick={this.update.bind(this)}>Update</button>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutItem;
