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
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurguerSucces(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurguerFail(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


////////////////// ORDERS //////////////////////////
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}


export const fetchOrders = () => {
    return dispatch => {
        
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(resp => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                //Success response.
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
                console.log('ERROR');

            });
    };
}