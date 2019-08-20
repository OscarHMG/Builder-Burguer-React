/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICE = {
    salad: 0.50,
    cheese: 0.4,
    meat: 1.30,
    bacon: 0.7
}

const initState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false, 
                totalPrice: 4
            }

        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }


}

export default reducer;