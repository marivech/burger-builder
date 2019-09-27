import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0,
    }

    componentWillMount() {
        // get set ingredients from URL
        const paramString = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (const [key, value] of paramString.entries()) {
            if (key ==='totalPrice') {
                totalPrice = +value;
            } else {
                ingredients[key] = +value;
            }
        }
        this.setState({ingredients, totalPrice});
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }

    render() {
        return (
            <article>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler} />
                <Route
                    path={`${this.props.match.url}/contact-data`}
                    render={ (props) => (
                        <ContactData
                            {...props}
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice} />
                        )} />
            </article>
        );
    }
}

export default Checkout;