import React from 'react';
import classes from './ToggleButton.module.css';

const closeButton = ({ clicked, viewState }) => (
    <div 
        className={ `${classes.ToggleButton} ${viewState === 'opened' ? classes.Opened : classes.Closed}` } 
        onClick={ clicked }
        ></div>
);
export default closeButton;