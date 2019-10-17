import { PRICES } from '../../configs/configs';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const reducer = (state = initialState, { type, name, ingredients }) => {
    switch (type) {
        case actionTypes.ADD_ITEM:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [name]: state.ingredients[name] + 1
                },
                totalPrice: state.totalPrice + PRICES[name],
            };
        case actionTypes.REMOVE_ITEM:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [name]: state.ingredients[name] - 1,
                },
                totalPrice: state.totalPrice - PRICES[name],
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients,
                error: false,
                totalPrice: 4,
            }
        case actionTypes.FAILED_INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: null,
                error: true,
            }
        default:
            return state;
    }
};

export default reducer;