import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "./../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "./../../../components/UI/Input/Input";

import { connect } from "react-redux";


import * as orderActions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler'

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLenght: 5,
          maxLenght: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your e-mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest delivery" },
            { value: "cheapest", displayValue: "Cheapest delivery" }
          ]
        },
        value: "fastest",
        valid: true,
        validation: {}
      }
    },
    loading: false,
    formIsValid: false
  };

  checkValidations = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== "" && isValid;

    if (rules.minLenght) isValid = value.length >= rules.minLenght && isValid;

    if (rules.maxLenght) isValid = value.length <= rules.minLenght && isValid;

    return isValid;
  };

  ordenHandler = event => {
    event.preventDefault();

    const data = {};
    for (let formElementId in this.state.orderForm) {
      data[formElementId] = this.state.orderForm[formElementId].value;
    }

    

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: data,
      userId: this.props.userId
    };

    //async
    this.props.onPurchaseOrderHandler(order);

  };

  inputEventHandler = (event, inputId) => {
    //Clone state object
    const updatedForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedForm[inputId]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidations(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    //console.log(updatedFormElement);

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    updatedForm[inputId] = updatedFormElement;

    this.setState({
      orderForm: updatedForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = null;
    if (this.props.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form autoComplete="off" onSubmit={this.ordenHandler}>
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
          <Button
            btnType="Success"
            clicked={this.ordenHandler}
            disabled={!this.state.formIsValid}
          >
            CONFIRM ORDER
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4> Contact data </h4> {form}
      </div>
    );
  }
}

const matchStateToProps = state => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId
  };
};

const matchDispatchToProps = dispatch =>{
  return{
    onPurchaseOrderHandler : (orderData) => dispatch(orderActions.purchaseBurguerStart(orderData))
  }
}

export default connect(matchStateToProps, matchDispatchToProps)(withErrorHandler(ContactData,axios));
