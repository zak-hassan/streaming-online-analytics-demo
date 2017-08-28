import React, { Component } from "react";
import { connect } from 'react-redux'
import SqlQuery from '../components/SqlQuery.jsx';
import QueryResults from '../components/QueryResults.jsx';
import PropTypes from 'prop-types';
import {
  updateQuery,
  handlePostQuery,
  clearTable,
} from '../orderQueryActions'

class OrderQueryView extends Component {
  static get propTypes(){
    return {
      query: PropTypes.string,
      table: PropTypes.array,
      clearTable: PropTypes.func,
      handlePostQuery: PropTypes.func,
      updateQuery: PropTypes.func,
    }
  }

  constructor(){
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSearch(e){
    e.preventDefault();
    this.props.handlePostQuery(this.props.query);
  }

  handleReset(){
    this.props.clearTable();
  }

  render() {
    let title = <h2 className="card-pf-title">Query Orders</h2>;
    let buttonStyle = {marginBottom: '20px', marginRight: '0px'};
    let divStyle = {overflow: 'hidden'};
    let resetButton =
      <button onClick={this.handleReset}
              className="btn btn-primary m-r-8 pull-right"
              style={buttonStyle}>
        Clear Table
      </button>;

    return (
      <div className="col col-cards-pf container-cards-pf fader">
        <div className="cards col-xs-10 col-md-8 ">
          <div className="card-pf card-pf-accented" style={divStyle}>
            {title}
            <div className="card-pf-footer">
              <p> Enter a search query below: </p>
              <SqlQuery updateQuery = {this.props.updateQuery}
                        query = {this.props.query}
                        handlePostQuery = {this.handleSearch}/>
              <QueryResults table = {this.props.table}/>
            </div>
            {resetButton}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    query: state.orderQueryReducer.query,
    table: state.orderQueryReducer.table,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuery: (updatedValue) => {
      dispatch(updateQuery(updatedValue))
    },
    handlePostQuery: (query) => {
      dispatch(handlePostQuery(query))
    },
    clearTable: () => {
      dispatch(clearTable())
    },
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(OrderQueryView)

