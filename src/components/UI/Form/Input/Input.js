import React from 'react';
import classes from './Input.module.css';

const input = ({ attrs, changed }) => {
    const config = {
        className: classes.Input,
        ...attrs,
    }
    return <input {...config} onChange={changed} />;
};
export default input;