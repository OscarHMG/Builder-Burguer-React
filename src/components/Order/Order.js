import React from "react";
import classes from "./Order.css"

const Order = (props) => {
  const ingredients = [];
  for(let ingName in props.ingredients){
    ingredients.push({name: ingName, amount: props.ingredients[ingName]})
  }

  const output = ingredients.map( ig => {
    return (<span 
        key={ig.name}
        style={{
          textTransform:'capitalize',
          display: 'inline-block',
          background: '#eef',
          margin: '0 2px',
          border: '1px solid #ccc',
          padding: '5px'
        }}>
        {ig.name} ({ig.amount})</span>);
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {output}</p>
      <p>Price: $ <strong>{parseFloat(props.price).toFixed(2)}</strong> </p>
    </div>
  );
};

export default Order;
