import * as actionTypes from '../actions/actionTypes'

const initState = {
    token : null,
    userId : null,
    error: null,
    loading: false, 
    redirectURL : '/'
}
const reducer = (state = initState, action) =>{
    switch (action.type) {
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true, 
                error: null
            };

        case actionTypes.AUTH_SUCCES:
            return{
                ...state,
                token: action.userInfo.idToken,
                userId: action.userInfo.localId,
                loading: false,
                error: false
            }
        

        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.LOG_OUT:
            return{
                ...state,
                token : null,
                userId: null

            }

        case actionTypes.REDIRECT_PATH:
            return{
                ...state,
                redirectURL : action.url
            }
    
        default:
            return state;
    }

}

export default reducer;