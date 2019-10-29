import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../configs/request';
import FormElm from '../../components/UI/Form/Form';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        isSignUp: true,
        controls: {
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
            password: {
                label: 'Password',
                formType: 'input',
                attrs: {
                    type: 'password',
                    placeholder: 'Password',
                    value: '',
                },
                validation: {
                    required: true,
                    minLength: 8,
                },
                isValid: false,
                touched: false,
            },
        },
        formIsValid: false,
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

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
    };
    changeFieldHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                isValid: this.checkFieldValueValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true,
                attrs: {
                    ...this.state.controls[inputIdentifier].attrs,
                    value: event.target.value,
                }
            }
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.attrs.value.trim(),
            this.state.controls.password.attrs.value.trim(),
            this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp,
            };
        });
    };

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                key,
                ...this.state.controls[key]
            })
        };
        

        const signMode = this.state.isSignUp ? 'SIGN UP' : 'SIGN IN';
        let message = this.props.error ? <p>{this.props.error.message}</p> : null;
        if (this.props.token) {
            message = (<Redirect to={this.props.authRedirectPath} />);
        }
        let form = (       
            <section className={ classes.Auth }>
                <Button
                    type='Danger'
                    clicked={ this.switchAuthModeHandler }>{ this.state.isSignUp ? 'Go to SIGN IN' : 'Go to SIGN UP' }</Button>
                    {message}
                <h1>{ signMode }</h1>
                <form onSubmit={ this.submitHandler }>
                    {formElements.map(({ attrs, formType, label, key, isValid, validation, touched }, i) =>
                        <FormElm
                            key={`${key}`}
                            formType={formType}
                            label={label}
                            attrs={attrs}
                            isValid={isValid}
                            shouldValidate={Object.keys(validation).length > 0}
                            touched={touched}
                            changed={(event) => this.changeFieldHandler(event, key)} />
                    )}
                <Button
                    type='Success'
                    clicked={this.placeOrderHandler}>{signMode}</Button>
                </form>
            </section>
        );

        if (this.props.loading) {
            form = (<section className={ classes.Auth }><Spinner show /></section>)
        }
        return form;
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));