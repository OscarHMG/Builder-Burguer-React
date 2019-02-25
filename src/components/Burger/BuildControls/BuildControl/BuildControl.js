import React from "react";
import style from './BuildControl.css';

const buildControls = props => {
  return (
    <div>
      <div>{props.label}</div>
      <button>Less</button>
      <button>More</button>
    </div>
  );
};

export default buildControls;
