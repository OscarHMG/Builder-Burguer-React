import React from "react";
import classes from "./Toolbar.css";
import Logo from "./../../Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationsItems";
import DrawerToogle from "../SideDrawer/DrawerToogle/DrawerToogle";


const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToogle clicked={props.drawerToogleClicked}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth}/>
      </nav>
    </header>
  );
};

export default toolbar;
