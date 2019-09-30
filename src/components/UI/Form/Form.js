import React from 'react';
import Input from './Input/Input';
import Select from './Select/Select';
import TextArea from './TextArea/TextArea';
import classes from './Form.module.css';

const form = ({ formType, attrs, label, changed, isValid, shouldValidate, touched }) => {
    let elm = null;
    switch (formType) {
        case 'textArea':
            elm = <TextArea attrs={attrs} changed={changed} />;
            break;
        case 'select':
            elm = <Select options={attrs.options} attrs={attrs.misc} changed={changed} />;
            break;
        default:
            elm = <Input attrs={attrs} changed={changed}/>;
            break;
    }
    return (
        <div className={`${classes.FormElement} ${isValid || !shouldValidate || !touched ? '' : classes.Invalid }`}>
            <label>{label}</label>
            {elm}
        </div>
    )
};
export default form;