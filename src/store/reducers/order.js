import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
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
        default: return state;
    }
};

export default reducer;