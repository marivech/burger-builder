import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import axios from '../../configs/request';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        customer: {
            name: 'kek',
            deliveryMethod: 'DHL',
            phoneNumber: '08000000000',
        },
        loading: false,
    };

    placeOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                ...this.state.customer,
            }
        }

        axios.post('/orders.json', order)
            .then(() => {
                this.setState({ loading: false});
                this.props.history.push('/');
            })
            .catch(() => {
                this.setState({ loading: false});
                this.props.history.push('/');
            })
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name"/>
                <input type="text" name="phoneNumber" placeholder="Your phone number"/>
                <Button
                    type='Success'
                    clicked={this.placeOrderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner show={this.state.loading} />
        }
        return (
            <section>    
                <h4>Your data</h4>
                {form}
            </section>
        )
    }
}

export default ContactData;