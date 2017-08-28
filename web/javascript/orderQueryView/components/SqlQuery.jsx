import React, { Component } from "react";
import PropTypes from 'prop-types';

class SqlQuery extends Component {
  static get propTypes(){
    return {
      query: PropTypes.string,
      updateQuery: PropTypes.func,
      handlePostQuery: PropTypes.func,
    }
  }

  render() {
    return(
      <form role="form" className="search-pf has-button">
        <div className="form-group">
          <div className="search-pf-input-group">
            <input id="search1"
                   type="text"
                   onChange={this.props.updateQuery}
                   className="form-control"
                   placeholder="Search"/>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-default" type="button" onClick={this.props.handlePostQuery}>
            <span className="fa fa-search"/>
          </button>
        </div>
      </form>
    );
  }

}

export default SqlQuery;
