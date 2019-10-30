import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {
                purchased: false,
            })
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {
                id: action.orderId,
            });
            return updateObject(state, {
                orders: state.orders.concat(newOrder),
                loading: false,
                error: false,
                purchased: true,
            })
        case actionTypes.PURCHASE_BURGER_FAILED:
            return updateObject(state, {
                error: action.error,
            })
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {
                loading: true,
            })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false,
            })
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            })
        default: return state;
    }
};

export default reducer;