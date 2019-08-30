import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.module.css';

const logo = ({ size }) => (
    <figure 
        className={`${classes.Logo} ${clsx('logo', { [classes.Small]: size === 'small', [classes.Large]: size === 'large' })}`}>
        <img src={burgerLogo} alt="MyBurger logo"/>
    </figure>
);


logo.propTypes = {
    size: PropTypes.oneOf(['large', 'small']),
};

export default logo;