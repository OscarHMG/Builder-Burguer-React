import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from './../../UI/Button/Button';


const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey =>{
      return (
      <li key={igKey}>
        <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    )});


  return (
    <Aux>
      <h3 style={{textAlign:'center'}}>YOUR ORDER</h3>
      <p>A delicious burguer with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: </strong>$ {props.totalPrice.toFixed(2)}</p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;
