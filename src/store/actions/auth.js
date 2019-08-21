import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authSuccess = (userInfo) =>{
    return{
        type: actionTypes.AUTH_SUCCES,
        userInfo
    }
}

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSubmit = (userInfo) =>{
    return dispatch => {
        //Async 
        dispatch(authStart());
        const payload = {
            ...userInfo,
            returnSecureToken: true
        }

        let url = '';
        if(userInfo.isSignUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIS_uqSKBQK19jydPRgO48uYgBmz5n-dk';
        else
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIS_uqSKBQK19jydPRgO48uYgBmz5n-dk'
        

        axios.post(url,payload).then( response => {
            console.log(response.data);
            dispatch(authSuccess(response.data));
        })
        .catch(err =>{
            dispatch(authFail(err.response.data.error));
        }) ;
    }
}