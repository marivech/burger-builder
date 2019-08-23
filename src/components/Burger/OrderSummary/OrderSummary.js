import React from 'react';
import Aux from './../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

const orderSummary = props => {
    const ingredientsSummary = Object.entries(props.ingredients)
        .map((elm, i) => 
            <li key={elm[0] + i}><span className={classes.IngredientName}>{elm[0]}:</span> {elm[1]}</li>
        );
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger contains:</p>
            <ul className={classes.OrderSummary}>
                {ingredientsSummary}
            </ul>
            <Button type="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button type="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};
export default orderSummary;