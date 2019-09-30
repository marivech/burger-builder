import React from 'react';
import classes from './Select.module.css';

const select = ({ attrs, changed, options = [] }) => {
    const config = {
        className: classes.Select,
        ...attrs,
    }
    return <select {...config} onChange={changed} >
        {options.map(({ value, text }, i) => (
            <option key={i} value={`${value}`}>
                {text}
            </option>
        ))}
    </select>;
};
export default select;
