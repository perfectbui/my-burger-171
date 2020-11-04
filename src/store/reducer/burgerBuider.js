import * as actionTypes from '../action/actionTypes'

const initialState={
    ingredients:{},
    totalPrice:4,
    error:false,
    building:false
}

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1.2,
    meat: 1,
    cheese: 0.8,
  };

const burgerBuilder = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                building:true,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                building:true,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients:action.ingredients,
                error:false,
                totalPrice:4,
                building:false,
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }
}

export default burgerBuilder;