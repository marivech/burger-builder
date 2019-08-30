import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const modal = props =>
    <Aux>
        <Backdrop show={props.show} clicked={props.closed} />
        <div 
            className={props.show ? classes.Modal : `${classes.Modal} ${classes.Hidden}`}>
            {props.children}
        </div>
    </Aux>;

export default modal;