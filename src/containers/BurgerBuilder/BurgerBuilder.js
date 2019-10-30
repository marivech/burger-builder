import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../configs/request';

export class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        building: false,
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    updatePurchaseState = ingredients => {
        const sum = Object.values(ingredients)
            .reduce((sum, elm) => sum + elm, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
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

        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner show={this.state.loading} />;
        let orderSummary = null;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.props.onAddItemHandler}
                        ingredientRemoved={this.props.onRemoveHandler}
                        disabledInfo={disabledInfo} 
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        checkouting={this.purchaseHandler}
                        isAuth={this.props.isAuth} />
                </Aux>
            );
            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ingredients}
                total={this.props.totalPrice} />;
        }
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    closed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddItemHandler: (name) => dispatch(actions.addItem(name)),
        onRemoveHandler: (name) => dispatch(actions.removeItem(name)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));