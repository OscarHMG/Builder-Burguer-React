import React from "react";
import style from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];
const buildControls = props => {
  
  return (
    <div className={style.BuildControls}>
      <p>
        Current price: $ <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(item => (
        <BuildControl
          key={item.label}
          label={item.label}
          added={() => props.ingredientAdded(item.type)}
          removed={() => props.ingredientRemoved(item.type)}
          disabled={props.disabled[item.type]}
        />
      ))}
      <button 
        className={style.OrderButton} 
        disabled={(!props.purchasable )}
        onClick={props.ordered}>
        {props.isAuth ? 'ORDER NOW': 'SIGN UP'}
      </button>
    </div>
  );
};

export default buildControls;
