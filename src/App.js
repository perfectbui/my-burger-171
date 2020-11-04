import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Aux from "./hoc/Auxiliary";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/Logout/Logout";
import * as actions from "./store/action/index";

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <Aux>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={LogOut} />
        </Layout>
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null,mapDispatchToProps)(App);
