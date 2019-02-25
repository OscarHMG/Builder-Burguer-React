import React from "react";
import Auxiliary from "../../hoc/Auxiliary";

import style from './Layout.css'

const layout = props => (
  <Auxiliary>
    <div> Toolbar, Sidedrawer, backdrop </div>
    <main className={style.Content}>{props.children}</main>
  </Auxiliary>
);

export default layout;
