import * as actionTypes from '../actions/actionTypes';

const initState = {
    orders: [],
    loading: false
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
                })
            }

        case actionTypes.PURCHASE_BURGUER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;