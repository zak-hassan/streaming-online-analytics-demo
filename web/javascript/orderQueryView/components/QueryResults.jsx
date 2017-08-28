import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";

class QueryResults extends Component {

  static get propTypes() {
    return {
      queryResults: PropTypes.array,
      table: PropTypes.array,
    }
  }

  createHeaders(table){
    let product = table[0];
    let columns = Object.keys(product);

    return columns.map((title, i) => {
      let row = null;
      if (i === 0){
        row = <TableHeaderColumn key={i} dataAlign="center" dataSort={true} dataField={title} isKey={true}>{title}</TableHeaderColumn>;
      } else {
        row = <TableHeaderColumn key={i} dataAlign="center" dataSort={true} dataField={title}>{title}</TableHeaderColumn>
      }
      return row;
    });
  }

  render() {
    let table = this.props.table;
    let bootStrapTable = <i> Nothing to show ...</i>;
    if (table.length > 0) {
      bootStrapTable =
        <BootstrapTable data={this.props.table} hover pagination>
         {this.createHeaders(table)}
        </BootstrapTable>;
    }

    return (
         <div >
              <h2 className="card-pf-title">
                Query result
              </h2>
            <div className="card-pf-body">
              {bootStrapTable}
            </div>
         </div>
    );
  }

}

export default QueryResults;
