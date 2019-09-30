import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import axios from '../../configs/request';
import Spinner from '../../components/UI/Spinner/Spinner';
import FormElm from '../UI/Form/Form';
import classes from './ContactData.module.css';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                label: 'Name',
                formType: 'input',
                attrs: {
                    type: 'text',
                    placeholder: 'Your name',
                    value: '',
                },
            },
            phoneNumber: {
                label: 'Phone number',
                formType: 'input',
                attrs: {
                    type: 'text',
                    placeholder: 'Your name',
                    value: '',
                }
            },
            deliveryMethod: {
                label: 'Delivery method',
                formType: 'select',
                attrs: {
                    misc: {},
                    options: [
                        {
                            value: '',
                            text: 'choose the delivery method',
                        },
                        {
                            value: 'dhl',
                            text: 'DHL'
                        },
                        {
                            value: 'ups',
                            text: 'UPS'
                        },
                    ],
                    value: '',
                },
            },
            comments: {
                label: 'Comments to order',
                formType: 'textArea',
                attrs: {},
            }
        },
        loading: false,
    };

    placeOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].attrs.value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: {...formData},
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

    changeFieldHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        
        updatedElement.attrs.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedElement;
        this.setState({ orderForm: updatedOrderForm });

    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                key,
                ...this.state.orderForm[key]
            })
        }
        let form = (
            <form>
                {
                    formElements.map(({ attrs, formType, label, key }, i) =>
                        <FormElm
                            key={`${key}`}
                            formType={formType}
                            label={label}
                            attrs={attrs}
                            changed={(event) => this.changeFieldHandler(event, key)} />
                    )
                }
                <Button
                    type='Success'
                    clicked={this.placeOrderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner show={this.state.loading} />
        }
        return (
            <section className={classes.ContactData}>    
                <h4>Your data</h4>
                {form}
            </section>
        )
    }
}

export default ContactData;