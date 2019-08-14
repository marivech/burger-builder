import React, { Component } from 'react';
import { INGREDIENTS, PRICES } from '../../configs/configs';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            ...INGREDIENTS
        },
        totalPrice: 4,
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo} 
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;