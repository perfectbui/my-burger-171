import * as actionTypes from './actionTypes'
import Axios from 'axios'

export const purchaseBurgerStart = (orderData,token) => {
    return dispatch => {
        Axios.post(
            "https://react-my-burger-f42bb.firebaseio.com/orders.json?auth="+token,
            orderData
          )
            .then((response) => {
                dispatch(purchaseBurgerSuccess(orderData,response.data.name))
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail());
            });
    }
}

export const purchaseBurgerFail = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL
    }
}

export const purchaseBurgerSuccess = (orderData,orderId) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData:orderData,
        orderId:orderId
    }
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = orders => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams ='?auth='+token+'&orderBy="userId"&equalTo="' + userId + '"';
        Axios.get('https://react-my-burger-f42bb.firebaseio.com/orders.json' + queryParams)
            .then(response=>{
                const fetchOrders=[];
                for (let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id:key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders))
            })
            .catch(error=>{
               dispatch(fetchOrdersFail(error))
            })
    }
}
