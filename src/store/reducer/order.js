import * as actionTypes from '../action/actionTypes'

const initialState = {
    orderForm:[],
    loading:true,
    purchased:false,
    error:null,
}

const order = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id:action.orderId,
            }
            return {
                ...state,
                orderForm:state.orderForm.concat(newOrder),
                purchased:true
            }
        case actionTypes.PURCHASE_BURGER_FAIL: 
            return {
                ...state
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased:false
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders:action.orders,
                loading:false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
       default:
        return state;
    }
}

export default order;