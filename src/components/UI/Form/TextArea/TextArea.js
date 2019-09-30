import React from 'react';
import classes from './TextArea.module.css';

const textArea = ({ attrs, changed }) => {
    const config = {
        className: classes.TextArea,
        ...attrs,
    }
    return <textarea {...config} onChange={changed} />;
};
export default textArea;