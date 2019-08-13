import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './*.module.css';


class BurgerIngredient extends Component {
    render() {
        const simpleIngrs = ['bread-bottom', 'cheese', 'meat', 'salad, bacon'];
        const complexIngrs = ['bread-top'];
    
        // convert type to string of CSS class
        const ingClass = this.props.type.replace(/(-\w)/g, m => m[1].toUpperCase());
    
        if (simpleIngrs.includes(this.props.type)) {
            return (
                <div 
                    className={classes[ingClass]}>
                </div>
            );
        } else if (complexIngrs.includes(this.props.type)) {
            return (
                <div className={classes[ingClass]}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
        } else {
            return null;
        }
    }
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
};

export default BurgerIngredient;