import * as actionTypes from '../actions/actionTypes';

const initState = {
    orders: [],
    loading: false, 
    purchased : false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGUER_SUCCESS:

            return {
                ...state,
                loading: false,
                orders: state.orders.concat({
                    ...action.orderData,
                    id: action.orderID
                }),
                purchased : true
            }

        case actionTypes.PURCHASE_BURGUER_FAIL:
            return {
                ...state,
                loading: false,
                purchased: false
            }

        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased : false
            }

        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }

        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;