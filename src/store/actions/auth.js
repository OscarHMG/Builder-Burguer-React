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


export const checkAuthTimeOut = (expTime) =>{
    return dispatch =>{
        setTimeout( ()=>{
            dispatch(logOut())
        }, expTime * 1000);
    }
}


export const logOut = () =>{
    //Remove token info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId');

    return {
        type: actionTypes.LOG_OUT
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
            dispatch(authSuccess(response.data));
            //Persistent in the browser
            const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000)); 
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        })
        .catch(err =>{
            dispatch(authFail(err.response.data.error));
        }) ;
    }
}

export const redirectPath = (url) =>{
    return{
        type: actionTypes.REDIRECT_PATH,
        url
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        }else{
            const expTime = new Date(localStorage.getItem('expirationDate'));
            if(expTime <= new Date()){
                dispatch(logOut());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess({userId, token}));
                dispatch(checkAuthTimeOut( (expTime.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}

