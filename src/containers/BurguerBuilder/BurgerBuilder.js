import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
  salad: 0.50,
  cheese: 0.4,
  meat: 1.30,
  bacon: 0.7
}

export default class BurgerBuilder extends Component {
  
  state = {
    ingredients : {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

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
  

  render() {
    const disableInfo = this.getDisableInfo();

    return (
      <Auxiliary>
        <Burger ingredients = {this.state.ingredients}/>
        <BuildControls 
          ingredientAdded ={this.addIngredientHandler} 
          ingredientRemoved={this.removeIngredientHandler}
          disabled = {disableInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}/>
      </Auxiliary>
    )
  }
}
