import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';


class BurgerIngredient extends Component {
    render() {
        const simpleIngrs = ['bread-bottom', 'cheese', 'meat', 'salad', 'bacon'];
        const complexIngrs = ['bread-top'];
    
        const ingClass = getClassName(this.props.type);
        if (simpleIngrs.includes(this.props.type)) {
            return (
                <li 
                    className={classes[ingClass]}>
                </li>
            );
        } else if (complexIngrs.includes(this.props.type)) {
            return (
                <li className={classes[ingClass]}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </li>
            );
        } else {
            return null;
        }
    }
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
};

function getClassName(string) {
    const upperCased = string.replace(/(-\w)/g, m => m[1].toUpperCase());
    return `${upperCased[0].toUpperCase()}${upperCased.slice(1)}`;
}

export default BurgerIngredient;