import React, { Component } from "react";
import { Route,Redirect } from "react-router-dom";
import {connect} from "react-redux"

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../../containers/Checkout/ContactData/ContactData";
import * as actions from "../../store/action/index"

class Checkout extends Component {

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentWillMount() {
    this.props.purchasedInit();
  }

  render() {
    let summary = (<Redirect to="/"/>)
    if(this.props.totalPrice!==4) {
      summary=<div>
      <CheckoutSummary
        ingredients={this.props.ingredients}
        cancel={this.checkoutCancelled}
        continue={this.checkoutContinued}
      />
      <Route
        path="/checkout/contact-data"
        component={ContactData}
      />
    </div>
    }
    return (
      <div>{summary}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuth: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchasedInit: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
