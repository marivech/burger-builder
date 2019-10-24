import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: null,
    loading: false,
    error: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                error: false,
                purchased: true,
            }
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        default: return state;
    }
};

export default reducer;