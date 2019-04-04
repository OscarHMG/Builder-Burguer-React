import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from './../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
export class ContactData extends Component {
  state = {
    orderForm : {
      name: 'Oscar Moncayo',
      street: 'Duran',
      zipCode: '1234',
      country: 'Ecuador',
      email: 'oscar_mg7@hotmail.com', 
      deliveryMethod: 'Fastest'
    },
    loading: false
  };  
  
  ordenHandler = (event) =>{

    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      
      ingredients: this.props.ingredients,
      price: this.props.price
      
    }
    axios.post('/orders.json', order)
      .then( response =>{
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(error=>{
        this.setState({
          loading: false,
        })
      });
  }

  render() {
    let form = null;
    if(this.state.loading){
      form = (<Spinner/>);
    }else{
      form = (
        <form autoComplete="off">
          <Input inputtype="input" type="email" name="email" placeholder="Your email" autoComplete="none"/>
          <Input inputtype="input" type="text" name="name" placeholder="Your name" autoComplete="none"/>
          <Input inputtype="input" type="text" name="street" placeholder="Street " autoComplete="none"/>
          <Input inputtype="input" type="text" name="postal" placeholder="Postal code" autoComplete="none"/>
          <Button btnType="Success" clicked={this.ordenHandler}>CONFIRM ORDER</Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
