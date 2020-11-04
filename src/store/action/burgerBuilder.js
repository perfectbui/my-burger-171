import * as actionTypes from './actionTypes'
import Axios from 'axios'

export const removeIngredient = (ingredientName) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingredientName
    }
}

export const addIngredient = (ingredientName) => {
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingredientName
    }
}

export const setIngredient = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}

export const fetchIngredientFail = () => {
    return {
        type:actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const inItIngredient = () => {
    return dispatch => {
        Axios.get('https://react-my-burger-f42bb.firebaseio.com/ingredients.json')
        .then(response=>{
            dispatch(setIngredient(response.data))
        })
        .catch(error=>{
            dispatch(fetchIngredientFail())
        })
    }
}