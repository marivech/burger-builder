import React, { Component } from 'react';
import { INGREDIENTS, PRICES } from '../../configs/configs';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            ...INGREDIENTS
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, elm) => sum + elm, 0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        console.log('You continued purchasing');
    };


    addIngredientHandler = type => {
        const oldQty = this.state.ingredients[type];
        const newQty = oldQty + 1;
        const newIngredients = { ...this.state.ingredients};
        newIngredients[type] = newQty;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + PRICES[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = type => {
        const oldQty = this.state.ingredients[type];
        if (oldQty > 0) {
            const newQty = oldQty - 1;
            const newIngredients = { ...this.state.ingredients};
            newIngredients[type] = newQty;

            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - PRICES[type];
            this.setState({
                ingredients: newIngredients,
                totalPrice: newPrice,
            });
            this.updatePurchaseState(newIngredients);
        }
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0;
        }
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    closed={this.purchaseCancelHandler}>
                    <OrderSummary
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}
                        total={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    checkouting={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;