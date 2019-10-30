import { PRICES } from '../../configs/configs';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const reducer = (state = initialState, { type, name, ingredients }) => {
    switch (type) {
        case actionTypes.ADD_ITEM:
            return updateObject(state, {
                ingredients: updateObject(state.ingredients,
                    { [name]: state.ingredients[name] + 1 }
                ),
                totalPrice: state.totalPrice + PRICES[name],
                building: true,
            });
        case actionTypes.REMOVE_ITEM:
            return updateObject(state, {
                ingredients: updateObject(state.ingredients,
                    { [name]: state.ingredients[name] - 1 }
                ),
                totalPrice: state.totalPrice - PRICES[name],
                building: true,
            });
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients,
                error: false,
                totalPrice: 4,
                building: false,
            })
        case actionTypes.FAILED_INIT_INGREDIENTS:
            return updateObject(state, {
                ingredients: null,
                error: true,
            })
        default:
            return state;
    }
};

export default reducer;