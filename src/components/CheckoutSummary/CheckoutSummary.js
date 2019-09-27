import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button'
import classes from './CheckoutSummary.module.css';

const OrderSummary = props => (
        <section className={classes.CheckoutSummary}>
            <Burger ingredients={props.ingredients}/>
            <nav className={classes.ButtonContainer}>
                <Button
                    type='Danger'
                    clicked={props.cancelCheckout}>Cancel</Button>
                <Button 
                    type='Success'
                    clicked={props.continueCheckout}>Continue</Button>
            </nav>
        </section>
);
export default OrderSummary;