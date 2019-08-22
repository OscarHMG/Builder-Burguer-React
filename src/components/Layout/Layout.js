import React, { Component } from 'react'

import Auxiliary from "../../hoc/Auxiliary";

import style from './Layout.css'
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

import { connect } from 'react-redux'


class Layout extends Component{
  state={
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () =>{
    this.setState({
      showSideDrawer: false
    });
  }

  /*
    CLEAN WAY TO DO THIS: This is because dependes of the prev state
  */
  sideDrawerToogleHandler = () =>{
    this.setState( (prevState) =>{
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render(){
    return(
    <Auxiliary>
      <Toolbar 
        isAuth = {this.props.isAuth}
        drawerToogleClicked={this.sideDrawerToogleHandler}/>
      <SideDrawer 
        isAuth = {this.props.isAuth}
        open={this.state.showSideDrawer}
        closed={this.sideDrawerCloseHandler}/>
      <main className={style.Content}>
        {this.props.children}
      </main>
    </Auxiliary>);
  }
  
};


const mapStateToProps = state =>{
  return {
    isAuth : state.auth.token !== null 
  }
}
export default connect(mapStateToProps)(Layout);
