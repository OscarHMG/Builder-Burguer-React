import React,{Component} from "react";
import classes from "./Modal.css";
import Auxiliary from "../../../hoc/Auxiliary";
import BackDrop from "../Backdrop/Backdrop";

class Modal extends Component{

  //Avoid re-rendering
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate(){
    console.log('[Modal.js] will update');
  }

  render(){
    return (
      <Auxiliary>
        <BackDrop show={this.props.show} clicked={this.props.modalClose}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translate(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}>
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
  
};

export default Modal;
