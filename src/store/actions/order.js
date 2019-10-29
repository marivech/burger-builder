import * as actionTypes from './actionTypes';
import axios from '../../configs/request';

export const purchaseBurgerSuccess = (orderData, id) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData,
        error: false,
    };
};


export const purchaseBurgerFailed = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
        loading: true,
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(orderData, response.data.name))
            })
            .catch(error => {
                console.log(error)
                dispatch(purchaseBurgerFailed(error))
            })
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrderSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

export const fetchOrderFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
};


export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = token => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get(`/orders.json?auth=${token}`)
            .then(({ data }) => {
                let fetchedOrders = [];
                for (let key in data) {
                    fetchedOrders.push({
                        key: key,
                        ingredients: data[key].ingredients,
                        price: data[key].price.toFixed(2),
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrderFail(error.message));
            })
    }
}