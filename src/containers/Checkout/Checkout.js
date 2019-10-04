import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
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
                    ingredients={this.props.ingredients}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler} />
                <Route
                    path={`${this.props.match.url}/contact-data`}
                    component={ContactData} />
            </article>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);