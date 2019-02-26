import React from "react";
import Auxiliary from "../../hoc/Auxiliary";

import style from './Layout.css'
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


const layout = props => (
  <Auxiliary>
    
    <Toolbar/>
    <SideDrawer />
    <main className={style.Content}>{props.children}</main>
  </Auxiliary>
);

export default layout;
