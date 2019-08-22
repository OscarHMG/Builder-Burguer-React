import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect} from 'react-router-dom'

import Spinner from "../../components/UI/Spinner/Spinner";

const style = [classes.Inline, classes.Pointer];

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };


  componentDidMount(){
    if(!this.props.burguerIsBuilding && this.props.redirectURL !== '/'){
      this.onRedirectAuthURL('/');
    }
  }

  checkValidations = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== "" && isValid;

    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    return isValid;
  };

  inputEventHandler = (event, controlName) => {
    const updateControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidations(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updateControls });
  };

  submithAuth = event => {
    event.preventDefault();
    this.props.onSubmitAuth({
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
      isSignUp: this.state.isSignUp
    });
  };

  switchModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = <Spinner />;
    let error = null;

    let isAuthRedirect = null;

    if (!this.props.loading) {
      form = (
        <form onSubmit={this.submithAuth}>
          {formElementsArray.map(element => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              invalid={!element.config.valid}
              touched={element.config.touched}
              changeHandler={event => this.inputEventHandler(event, element.id)}
            />
          ))}
          <div>
            <Button btnType="Success" className={classes.Inline}>
              SUBMIT
            </Button>

            <p className={style.join(" ")} onClick={this.switchModeHandler}>
              SWITCH TO {!this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
            </p>
          </div>
        </form>
      );
    }

    if(this.props.error){
      error = (<p className={classes.Error}>ERROR: {this.props.error.message}</p>);
    }


    if(this.props.isAuthenticated){
      isAuthRedirect = <Redirect to={this.props.redirectURL}/>;
    }

    return (
      <div className={classes.Auth}>
        <h4>{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</h4>
        {isAuthRedirect}
        {error}
        {form}
        
      </div>
    );
  }
}

const matchStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated : state.auth.token !== null,
    burguerIsBuilding : state.burguerBuilder.burguerIsBuilding,
    redirectURL : state.auth.redirectURL
  };
};

const matchDispatchToProps = dispatch => {
  return {
    onSubmitAuth: userData => dispatch(actions.authSubmit(userData)),
    onRedirectAuthURL : (path) => dispatch(actions.redirectPath(path))

  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(Auth);
