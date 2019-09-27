import React, { Component } from 'react';
import Burger from '../Burger/Burger';
import ContactData from '../ContactData/ContactData';

class OrderSummary extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 2,
        }
    }
    render() {
        return (
            <div>
                <h1>Your order</h1>
                <Burger ingredients={this.state.ingredients}/>
                <ContactData />
            </div>
        )
    }
};
export default OrderSummary;