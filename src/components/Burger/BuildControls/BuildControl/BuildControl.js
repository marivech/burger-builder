import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = props => {
    return (
        <li className={classes.BuildControl}>
            <span className={classes.Label}>{props.label}</span>
            <button 
                onClick={props.removed}
                className={classes.Less}
                disabled={props.disabled}>Less</button>
            <button 
                onClick={props.added}
                className={classes.More}>More</button>
        </li>
    )
};
export default buildControl;