import React, {Component} from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from './../../UI/Button/Button';


class OrderSummary extends Component {

  componentWillUpdate(){
    console.log('Rendering orderSummary.js');
  }

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey =>{
      return (
      <li key={igKey}>
        <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li>
    )});

    return(
      <Aux>
      <h3 style={{textAlign:'center'}}>YOUR ORDER</h3>
      <p>A delicious burguer with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: </strong>$ {this.props.totalPrice.toFixed(2)}</p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
    </Aux>
    );
  }
  

};

export default OrderSummary;

