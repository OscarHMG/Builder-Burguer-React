import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    addres: {
      street: "",
      postalCode: ""
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
      price: this.props.price,
      customer:{
        name: 'Oscar Moncayo',
        address: {
          street: 'Duran',
          zipCode: '1234',
          country: 'Ecuador'
        },
        email: 'oscar_mg7@hotmail.com'
      }
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
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street " />
          <input className={classes.Input} type="text" name="postal" placeholder="Postal code " />
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
