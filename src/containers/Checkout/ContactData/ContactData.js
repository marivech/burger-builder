import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FormElm from '../../../components/UI/Form/Form';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../configs/request';
import { checkFieldValueValidity, updateObject } from '../../../shared/utility';


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
                isValid: true,
                touched: false,
            },
        },
        loading: false,
        formIsValid: false,
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
            userId: this.props.userId,
        }

        this.props.onOrderPlaced(order, this.props.token);
    }

    changeFieldHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(
            this.state.orderForm[inputIdentifier],
            {
                isValid: checkFieldValueValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
                touched: true,
                attrs: updateObject(
                    this.state.orderForm[inputIdentifier].attrs,
                    { value: event.target.value, }
                ),
            }
        );

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement,
        });

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
        token: state.auth.token,
        userId: state.auth.userId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderPlaced: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));