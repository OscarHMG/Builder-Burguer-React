import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux'

class Checkout extends Component {
  


  /* {
    meat: 0,
    salad: 0,
    cheese: 0,
    bacon: 0
  } */
  

  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkOutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCancelled={this.checkOutCancelHandler}
          onCheckoutContinue={this.checkOutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    ings: state.ingredients,
    price: state.totalPrice
  }
}



export default connect(mapStateToProps)(Checkout);