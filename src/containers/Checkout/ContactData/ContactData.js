import React, { Component } from "react";
import {connect} from "react-redux"
import { Redirect } from "react-router-dom";

import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/action/index"

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touch: false,
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        validation: {
          minLength: 5,
          required: true,
        },
        valid: false,
        touch: false,
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fasted", displayValue: "Fasted" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation:'',
        value: "Fasted",
        valid:true
      },
    },
    loading: false,
    formIsValid: false,
  };

  checkValidation(rules, input) {
    let isValid = true;
    if (rules.required) {
      isValid = input.value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = input.value.length >= rules.minLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updateOrderForm = { ...this.state.orderForm };
    const updateInputIdentifier = { ...updateOrderForm[inputIdentifier] };
    updateInputIdentifier.value = event.target.value;
    updateOrderForm[inputIdentifier] = updateInputIdentifier;
    updateOrderForm[inputIdentifier].touch = true;
    updateOrderForm[inputIdentifier].valid = this.checkValidation(updateOrderForm[inputIdentifier].validation,updateInputIdentifier);
    let isValidForm=true;
    for (let key in updateOrderForm) {
      isValidForm=updateOrderForm[key].valid && isValidForm;
    }
    this.setState({ orderForm: updateOrderForm, formIsValid:isValidForm });
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      contactData: formData,
      userId:this.props.userId
    };
    this.props.orderBurger(orders,this.props.token);
  };

  render() {
    let formElement = [];
    let form = <Spinner />;
    for (let key in this.state.orderForm) {
      formElement.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    if (!this.state.loading) {
      form = (
        <form
          className="flex flex-col items-center mt-4 mb-5 border border-black border-solid w-3/5 m-auto"
          onSubmit={this.orderHandler}
        >
          <div className="font-bold text-3xl text-center">Enter your Contact Data</div>
          {formElement.map((element) => (
            <Input
              key={element.id}
              inputType={element.config.elementType}
              value={element.config.value}
              elementConfig={element.config.elementConfig}
              changed={(event) => this.inputChangedHandler(event, element.id)}
              valid={element.config.valid}
              touch={element.config.touch}
            />
          ))}
          <button className="font-bold text-green-400 text-2xl outline-none" disabled={!this.state.formIsValid}>ORDER</button>{" "}
        </form>
      );
    }
    let redirect=null;
    if(this.props.purchased) {
      redirect=<Redirect to="/"/>
    }
    return <div>{form}{redirect}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    purchased: state.order.purchased,
    token:state.auth.token,
    userId:state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderBurger: (orders,token) => dispatch(actions.purchaseBurgerStart(orders,token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);
