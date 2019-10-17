import * as actionTypes from './actionTypes';
import axios from '../../configs/request';

export const addItem = name => {
    return {
        type: actionTypes.ADD_ITEM,
        name,
    };
};

export const removeItem = name => {
    return {
        type: actionTypes.REMOVE_ITEM,
        name,
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FAILED_INIT_INGREDIENTS,
        error: true,
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(({ data }) => {
                dispatch(setIngredients(data));
            })
            .catch(() => {
                dispatch(fetchIngredientsFailed())
            });
    }
}