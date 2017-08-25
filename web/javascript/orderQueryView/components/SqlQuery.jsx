import React, { Component } from "react";

class SqlQuery extends Component {
  render() {
    return(
      <form role="form" className="search-pf has-button">
        <div className="form-group">
          <div className="search-pf-input-group">
            <input id="search1" type="search" className="form-control" placeholder="Search"/>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-default" type="button"><span className="fa fa-search"></span></button>
        </div>
      </form>
    );
  }

}

export default SqlQuery;
