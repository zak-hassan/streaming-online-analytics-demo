import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import NavBar from "./navBar/components/NavBar.jsx";
import Message from "./message/components/Message.jsx";
import ProductView from "./productView/containers/ProductView.jsx";
import OrderView from "./orderView/containers/OrderView.jsx";
import OrderQueryView from "./orderQueryView/containers/OrderQueryView.jsx";

import { clearMessage } from "./message/messageActions";

class App extends Component {

  static get propTypes() {
    return {
      message: PropTypes.string,
      messageType: PropTypes.string,
      icon: PropTypes.string,
      visible: PropTypes.bool,
      clearMessage: PropTypes.func
    }
  }

  render() {
    return (
        <Router>
          <div className="app">
            <NavBar/>
            <Message message={this.props.message} messageType={this.props.messageType}
              icon={this.props.icon} visible={this.props.visible}
              clearMessage={this.props.clearMessage}/>
            <Switch>
               <Route exact path="/" component={ProductView}/>
            </Switch>
            <Switch>
               <Route exact path="/order" component={OrderView}/>
            </Switch>
            <Switch>
               <Route exact path="/query" component={OrderQueryView}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.messageReducer.message,
    messageType: state.messageReducer.messageType,
    icon: state.messageReducer.icon,
    visible: state.messageReducer.visible
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      clearMessage: () => {
          dispatch(clearMessage())
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
