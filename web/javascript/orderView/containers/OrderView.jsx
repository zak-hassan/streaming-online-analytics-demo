import React, { Component } from "react";

class OrderView extends Component {
  render() {
    return (
    <div className="container-fluid">
      <div className="list-group list-view-pf list-view-pf-view">
        <div className="list-view-pf-main-info">
          <div className="list-view-pf-left">
            <span className="fa fa-plane list-view-pf-icon-sm"></span>
          </div>
          <div className="list-view-pf-body">
            <div className="list-view-pf-description">
              <div className="list-group-item-heading">
                Event One
              </div>
              <div className="list-group-item-text">
                The following snippet of text is <a href="#">rendered as link text</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default OrderView;
