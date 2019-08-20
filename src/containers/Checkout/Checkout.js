import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";


class Checkout extends Component {

  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkOutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    

    if (this.props.ings) {

      let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.checkOutCancelHandler}
            onCheckoutContinue={this.checkOutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />{" "}
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burguerBuilder.ingredients,
    purchased: state.order.purchased 
  };
};


export default connect(mapStateToProps)(Checkout);
