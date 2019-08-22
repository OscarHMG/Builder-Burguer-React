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

        const token = getState().auth.token;
        axios.post('/orders.json?auth='+token, orderData)
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
    return (dispatch, getState) => {
        
        dispatch(fetchOrderStart());
        //Get token from STORE state.
        const token = getState().auth.token;
        const queryParams = '?auth='+token + '&orderBy="userId"&equalTo="'+ getState().auth.userId+'"';
        axios.get('/orders.json'+queryParams)
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