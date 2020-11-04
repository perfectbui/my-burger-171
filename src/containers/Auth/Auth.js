import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import './Auth.css'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/action/index'

class Auth extends Component {
    state = {
        controls: {
          email: {
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Your Email Address",
            },
            validation: {
                minLength: 6,
              required: true,
            },
            valid: false,
            touch: false,
            value: "",
          },
          password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Your Password",
            },
            validation: {
              minLength: 6,
              required: true,
            },
            valid: false,
            touch: false,
            value: "",
          },
        },
        formIsValid: false,
        isSignUp:true
      };

      checkValidation(rules, value) {
        let isValid = true;
        if (rules.required) {
          isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid;
        }
        return isValid;
      }

      switchHandler=(event) => {
        event.preventDefault();
        this.setState(prevState => {
          return {isSignUp:!prevState.isSignUp}
        })
      }
    
      inputChangedHandler = (event, controlName) => {
        const updateControls = { ...this.state.controls,
        [controlName]:{
            ...this.state.controls[controlName],
            value:event.target.value,
            touch:true,
            valid:this.checkValidation(this.state.controls[controlName].validation,event.target.value)
        } };
        let isValidForm=true;
        for (let key in updateControls) {
          isValidForm=updateControls[key].valid && isValidForm;
        }
        this.setState({ controls: updateControls, formIsValid:isValidForm });
      };

      orderHandler = (event) => {
        event.preventDefault();
        this.props.authHandler(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
      }

      render() {
        let formElement = [];
        let form = <Spinner />;
        for (let key in this.state.controls) {
          formElement.push({
            id: key,
            config: this.state.controls[key],
          });
        }
        if (!this.props.loading) {
          form = (
            <form
              className="form"
              onSubmit={this.orderHandler}
            >
              <div className="font-bold text-4xl text-center mt-4 mb-2">{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</div>
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
              <button className="btn-submit" disabled={!this.state.formIsValid}>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</button>{" "}
              <button className="btn-switch" onClick={this.switchHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
            </form>
          );
        }
        let errorMessage=null;
        if(this.props.error) {
        errorMessage=(<div className="w-3/5 bg-red-400 text-red-600 m-auto"><p className="text-center">{this.props.error.message}</p></div>);
        }
        let redirect =null;
        if(this.props.token) {
          redirect = <Redirect to={this.props.redirectPath}/>
        }
      return <div>{redirect}{errorMessage}{form}</div>;
      }
    }

  const mapDispatchToProps = dispatch => {
    return {
      authHandler: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp))
    }
  }

  const mapStateToProps = state => {
    return {
      loading: state.auth.loading,
      token: state.auth.token,
      userId: state.auth.userId,
      error: state.auth.error,
      building:state.burgerBuilder.building,
      redirectPath:state.auth.redirectPath
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Auth);