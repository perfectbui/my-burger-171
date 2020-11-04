import * as actionTypes from '../action/actionTypes'

const initialState = {
    token:null,
    userId:null,
    loading:false,
    error:null,
    redirectPath:"/"
}

const auth = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading:false,
                userId:action.userId,
                token:action.token
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                loading:false,
                token:null,
                userId:null
            }
        case actionTypes.AUTH_SET_REDIRECT_PATH:
            return {
                ...state,
                redirectPath:action.path
            }
        default:
            return state;
    }
}

export default auth;