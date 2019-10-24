import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../configs/request';

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        let orders = <Spinner show />;
        if (this.props.orders) {
            orders = this.props.orders.map(order =>
                <Order key={order.key} ingredients={order.ingredients} price={order.price}/>  
            );
        }
        return orders;
    };
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));