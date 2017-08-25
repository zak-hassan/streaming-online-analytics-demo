import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";

class QueryResults extends Component {

  static get propTypes() {
    return {
      queryResults: PropTypes.array,
    }
  }

  render() {

    return (
       <div className="container container-cards-pf">
         <div className="card-pf card-pf-accented">
            <div className="card-pf-heading">
              <h2 className="card-pf-title">
                Query result
              </h2>
            </div>
            <div className="card-pf-body">
              <BootstrapTable data={this.props.queryResults} hover pagination>
                <TableHeaderColumn dataAlign="center" dataSort={true} dataField="id" isKey={true}>Id</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataSort={true} dataField="pname">Product name</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataSort={true} dataField="pprice">Product price</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataSort={true} dataField="pcat">Product category</TableHeaderColumn>
              </BootstrapTable>
            </div>
         </div>
       </div>

    );
  }

}

export default QueryResults;
