import * as actionTypes from '../actions/actionTypes'

const initState = {
    token : null,
    userId : null,
    error: null,
    loading: false
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
            console.log('action', action);
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
    
        default:
            return state;
    }

}

export default reducer;