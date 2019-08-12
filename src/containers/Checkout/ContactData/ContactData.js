import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from './../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';


export class ContactData extends Component {
  state = {
    orderForm : {
      name: {
        elementType: 'input',
        elementConfig :{
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation:{
          required: true
        },
        valid : false,
        touched : false,

      },
      street: {
        elementType: 'input',
        elementConfig :{
          type: 'text',
          placeholder: 'Your street address'
        },
        value: '',
        validation:{
          required: true
        },
        valid : false,
        touched : false
      },
      zipCode: {
        elementType: 'input',
        elementConfig :{
          type: 'text',
          placeholder: 'Your ZIP Code'
        },
        value: '',
        validation:{
          required: true,
          minLenght: 5,
          maxLenght: 5
        },
        valid : false,
        touched : false
      },
      country: {
        elementType: 'input',
        elementConfig :{
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
        validation:{
          required: true
        },
        valid : false,
        touched : false
      },
      email: {
        elementType: 'input',
        elementConfig :{
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
        validation:{
          required: true
        },
        valid : false,
        touched : false
      }, 
      deliveryMethod: {
        elementType: 'select',
        elementConfig :{
          options: [
            {value: 'fastest', displayValue:'Fastest delivery'},
            {value: 'cheapest', displayValue: 'Cheapest delivery'}
          ]
        },
        value: 'fastest',
        valid:true,
        validation:{}
      }
        
    },
    loading: false, 
    formIsValid : false
  };  

  checkValidations = (value, rules) =>{
    let isValid = true;

    if(rules.required)
      isValid = value.trim() !== '' && isValid;
    

    if(rules.minLenght)
      isValid = value.length >= rules.minLenght && isValid;
    
    if(rules.maxLenght)
      isValid = value.length <= rules.minLenght && isValid;

    return isValid;
  }
  
  ordenHandler = (event) =>{

    this.setState({
      loading: true
    });

    const data ={};
    for(let formElementId in this.state.orderForm){
      data[formElementId] = this.state.orderForm[formElementId].value;

    }

    event.preventDefault();
    
    const order = {
      
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: data
      
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

  inputEventHandler = (event, inputId) =>{
    //Clone state object
    const updatedForm = {
      ...this.state.orderForm
    };

    const updatedFormElement ={
      ...updatedForm[inputId]
    }

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidations(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    console.log(updatedFormElement);

    let formIsValid = true;
    for(let inputIdentifier in updatedForm){
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid; 
    }
    updatedForm[inputId] = updatedFormElement;

    this.setState({
      orderForm: updatedForm,
      formIsValid: formIsValid
    });

  }

  render() {
    const formElementsArray = [];

    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }


    let form = null;
    if(this.state.loading){
      form = (<Spinner/>);
    }else{
      form = (
        <form autoComplete="off" onSubmit={this.ordenHandler}>

          {formElementsArray.map(element=>(
            <Input 
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              invalid ={!element.config.valid}
              touched = {element.config.touched}
              changeHandler={(event) => this.inputEventHandler(event, element.id)}
              />
          ))}

          <Button 
            btnType="Success" 
            clicked={this.ordenHandler} 
            disabled={!this.state.formIsValid}>CONFIRM ORDER</Button>
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
