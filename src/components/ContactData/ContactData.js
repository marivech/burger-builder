import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import FormElm from '../UI/Form/Form';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import * as orderActions from '../../store/actions';


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
                validation: {
                    required: true,
                },
                isValid: false,
                touched: false,
            },
            email: {
                label: 'Email',
                formType: 'input',
                attrs: {
                    type: 'text',
                    placeholder: 'Your email',
                    value: '',
                },
                validation: {
                    required: true,
                    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                },
                isValid: false,
                touched: false,
            },
            phoneNumber: {
                label: 'Phone number',
                formType: 'input',
                attrs: {
                    type: 'text',
                    placeholder: 'Your name',
                    value: '',
                },
                validation: {
                    required: true,
                    minLength: 10,
                },
                isValid: false,
                touched: false,
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
                validation: {
                    required: true,
                },
                isValid: false,
                touched: true,
            },
            comments: {
                label: 'Comments to order',
                formType: 'textArea',
                attrs: {},
                validation: {},
                isValid: false,
                touched: false,
            },
        },
        loading: false,
        formIsValid: false,
    };

    checkFieldValueValidity = (value, rules) => {
        let isValid = true;
        
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        if (rules.match) {
            isValid = rules.match.test(value) && isValid;
        }
        return isValid;
    }

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

        this.props.onOrderPlaced(order);
    }

    changeFieldHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        
        updatedElement.attrs.value = event.target.value;

        if (updatedElement.validation && updatedElement.touched) {
            updatedElement.isValid = this.checkFieldValueValidity(updatedElement.attrs.value, updatedElement.validation)
        }

        updatedElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].isValid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid});

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
                    formElements.map(({ attrs, formType, label, key, isValid, validation, touched }, i) =>
                        <FormElm
                            key={`${key}`}
                            formType={formType}
                            label={label}
                            attrs={attrs}
                            isValid={isValid}
                            shouldValidate={Object.keys(validation).length > 0}
                            touched={touched}
                            changed={(event) => this.changeFieldHandler(event, key)} />
                    )
                }
                <Button
                    disabled={!this.state.formIsValid}
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.order.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderPlaced: orderData => dispatch(orderActions.purchaseBurger(orderData)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);