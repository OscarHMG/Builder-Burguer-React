import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from './../../components/UI/Spinner/Spinner';
import errorHandler from './../../hoc/ErrorHandler/ErrorHandler';
import axios from './../../axios-orders';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'




class BurgerBuilder extends Component {
  
  state = {
    
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    /* axios.get('https://react-builder-burguer.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({
        ingredients: response.data
      });
    })
    .catch( error =>{
      this.setState({ error: true});
    }) */
  }

  updatePurchaseState = () =>{
    
    const sum = Object.keys(this.props.ings).map( item =>{
      return this.props.ings[item]
    }).reduce( (sum, el)=>{
      return sum + el;
    }, 0);


    return sum >0

  }

  getDisableInfo = () =>{
    const disableInfo = {
      ...this.props.ings
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
    
    this.props.history.push('/checkout');
  }

  render() {
    const disableInfo = this.getDisableInfo();

    let orderSummary = null;
    
  

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    if(this.props.ings){
      burger =(<Auxiliary>
        <Burger ingredients = {this.props.ings}/>
        <BuildControls 
          ingredientAdded ={this.props.onIngredientAdded} 
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled = {disableInfo}
          purchasable={this.updatePurchaseState()}
          price={this.props.price}
          ordered={this.purchaseHandler}/>
        </Auxiliary>);

      orderSummary = (<OrderSummary 
        ingredients={this.props.ings}
        totalPrice={this.props.price}
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

const mapStateToProps = (state) =>{
  return{
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onIngredientAdded : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));