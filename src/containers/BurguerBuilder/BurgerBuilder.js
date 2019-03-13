import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'

import Spinner from './../../components/UI/Spinner/Spinner';
import errorHandler from './../../hoc/ErrorHandler/ErrorHandler';


const INGREDIENTS_PRICE = {
  salad: 0.50,
  cheese: 0.4,
  meat: 1.30,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  
  state = {
    ingredients : null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('https://react-builder-burguer.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({
        ingredients: response.data
      });
    })
    .catch( error =>{
      this.setState({ error: true});
    })
  }

  updatePurchaseState = (ingredients) =>{
    
    const sum = Object.keys(ingredients).map( item =>{
      return ingredients[item]
    }).reduce( (sum, el)=>{
      return sum + el;
    }, 0);

    this.setState({
      purchasable: sum >0
    });
  }


  addIngredientHandler = (type) =>{
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

    updatedIngredients[type] = updatedCount;

    this.setState({
      ingredients : updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updatedIngredients);    
  }

  removeIngredientHandler = (type) =>{
    
    if(this.state.ingredients[type] <= 0)
      return
    

    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updatedIngredients);
  }

  getDisableInfo = () =>{
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    return disableInfo;
  }
  

  purchaseHandler = () =>{
    this.setState({
      purchasing:true
    });
  }

  purchaseCancelHandler = () =>{
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () =>{
    /* this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        loading: false,
        purchasing: false
      });


    })
    .catch(error=>{
      this.setState({
        loading: false,
        purchasing: false
      })
    }); */

    //1st need to go checkout page
    const ingredients = this.state.ingredients;
    const queryParams = [];
    for(let i in ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
    }

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    const disableInfo = this.getDisableInfo();

    let orderSummary = null;
    
  

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    if(this.state.ingredients){
      burger =(<Auxiliary>
        <Burger ingredients = {this.state.ingredients}/>
        <BuildControls 
          ingredientAdded ={this.addIngredientHandler} 
          ingredientRemoved={this.removeIngredientHandler}
          disabled = {disableInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}/>
        </Auxiliary>);

      orderSummary = (<OrderSummary 
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}/>);

      if(this.state.loading)
        orderSummary = <Spinner/>
    }
      
        
    
    return (
      <Auxiliary>
        <Modal 
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}>
          {orderSummary}
          
        </Modal>
        {burger}
        
      </Auxiliary>
    )
  }
}

export default errorHandler(BurgerBuilder, axios);