import React, { Component } from "react";

class OrderQueryView extends Component {
  render() {
    let title = <h2 className="card-pf-title">Query Orders</h2>;
    let content = <p>content</p>;


    return (
      <div className="col col-cards-pf container-cards-pf fader">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
            {title}
            <div className="card-pf-footer ">
              {content}
            </div>
            <div className="card-pf-footer card-pf">
              footer
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default OrderQueryView;
