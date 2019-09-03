import React from 'react';

import classes from './Spinner.module.css';

const spinner = ({ show }) => (
    show ? <div className={classes.Loader}>Loading...</div> : null
);
export default spinner;