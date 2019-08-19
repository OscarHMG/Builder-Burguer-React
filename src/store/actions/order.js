import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const purchaseBurguerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderID: id,
        orderData
    }
}


export const purchaseBurguerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    }
}


//ASYNC 

export const purchaseBurguerStart = (orderData) => {
    return (dispatch, getState) => {
        //TEST
        console.log(getState())
        getState().order.loading = true;
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurguerSucces(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurguerFail(error))
            });
    }
}