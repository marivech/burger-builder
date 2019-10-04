import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../configs/actionTypes';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        this.updatePurchaseState(this.props.ingredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, elm) => sum + elm, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push ({
            pathname: '/checkout',
        });
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0;
        }


        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    closed={this.purchaseCancelHandler}>
                    <Spinner show={this.state.loading} />
                    <OrderSummary
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.props.ingredients}
                        total={this.props.totalPrice} />
                </Modal>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls 
                    ingredientAdded={this.props.onAddItemHandler}
                    ingredientRemoved={this.props.onRemoveHandler}
                    disabledInfo={disabledInfo} 
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    checkouting={this.purchaseHandler} />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddItemHandler: (name) => dispatch({ type: actionTypes.ADD_ITEM, name}),
        onRemoveHandler: (name) => dispatch({ type: actionTypes.REMOVE_ITEM, name})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);