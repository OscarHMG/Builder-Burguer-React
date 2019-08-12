import React from "react";
import classes from "./Input.css";
const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let errorMessage = null;
  if(props.invalid && props.touched){
    inputClasses.push(classes.Invalid);
    errorMessage = <p className={classes.ErrorMessage}>Enter correct values!</p>
  }

  switch (props.elementType) {
    case "input":
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changeHandler}

        />;
      break;
    case "textarea":
      inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changeHandler}

        />;
      break;
    
    case "select":
      inputElement = <select 
        className={classes.InputElement}
        onChange={props.changeHandler}>
          {props.elementConfig.options.map( element =>(
            <option key={element.value} value={element.value}>{element.displayValue}</option>
          ))}
          
        </select>;
      break;

    default:
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
          onChange={props.changeHandler}
        />;
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default input;
