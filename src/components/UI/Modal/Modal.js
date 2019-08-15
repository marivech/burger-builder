import React from 'react';
import classes from './Modal.module.css';

const modal = props =>
    <div 
        className={props.show ? classes.Modal : `${classes.Modal} ${classes.Hidden}`}>
        {props.children}
    </div>;

export default modal;