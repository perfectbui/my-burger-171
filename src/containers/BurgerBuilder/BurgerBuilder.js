import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/action/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.inItIngredient();
  }

  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum <= 0;
  };

  updatePurchasing = () => {
    if(this.props.isAuth){
      this.setState({ purchasing: true });
    }
    else{
      this.props.setRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let disableRemove = { ...this.props.ingredients };
    for (let key in disableRemove) {
      disableRemove[key] = disableRemove[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredients}
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        {this.props.error?<p>FETCH INGREDIENTS FAILED</p>:<Aux><Modal
          show={this.state.purchasing}
          closedModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        <BurgerControls
          price={this.props.totalPrice.toFixed(2)}
          ingredientAdded={this.props.addIngredient}
          ingredientRemoved={this.props.removeIngredient}
          disableRemove={disableRemove}
          disablePurchase={this.updatePurchase(this.props.ingredients)}
          order={this.updatePurchasing}
          isAuth={this.props.isAuth}
        /></Aux>}
        </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth:state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    removeIngredient: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    inItIngredient: () => dispatch(actions.inItIngredient()),
    setRedirectPath: (path) => dispatch(actions.authSetRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
