import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "./../../components/UI/Spinner/Spinner";
import errorHandler from "./../../hoc/ErrorHandler/ErrorHandler";

import { connect } from "react-redux";
import * as burguerBuilderActions from "../../store/actions/index";

import axios from "./../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    //Call async method through redux (props)
    this.props.onInitIngredients();
  }

  updatePurchaseState = () => {
    const sum = Object.keys(this.props.ings)
      .map(item => {
        return this.props.ings[item];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  getDisableInfo = () => {
    const disableInfo = {
      ...this.props.ings
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return disableInfo;
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = this.getDisableInfo();

    let orderSummary = null;

    let burger = this.props.error ? (
      <p> Ingredients can 't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />{" "}
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState()}
            price={this.props.price}
            ordered={this.purchaseHandler}
          />{" "}
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          {" "}
          {orderSummary}{" "}
        </Modal>{" "}
        {burger}{" "}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    error: state.burguerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burguerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(burguerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burguerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(BurgerBuilder, axios));
