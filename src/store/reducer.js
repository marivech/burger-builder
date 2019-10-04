import { INGREDIENTS, PRICES } from '../configs/configs';
import * as actionTypes from '../configs/actionTypes';

const initialState = {
    ingredients: {
        ...INGREDIENTS,
    },
    totalPrice: 4,
};

const reducer = (state = initialState, { type, name }) => {
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
        default:
            return state;
    }
};

export default reducer;