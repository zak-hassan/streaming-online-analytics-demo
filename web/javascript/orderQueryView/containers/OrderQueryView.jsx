import React, { Component } from "react";

import SqlQuery from '../components/SqlQuery.jsx';
import QueryResults from '../components/QueryResults.jsx';

class OrderQueryView extends Component {
  render() {
    let title = <h2 className="card-pf-title">Query Orders</h2>;

    return (
      <div className="col col-cards-pf container-cards-pf fader">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented">
            {title}
            <div className="card-pf-body">
              <SqlQuery/>
              <QueryResults/>
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
