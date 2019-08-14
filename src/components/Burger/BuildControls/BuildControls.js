import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
];
const buildControls = props => 
    <div className={classes.BuildControls}>
        <p>Current price: <span>{props.price.toFixed(2)}</span></p>
        {controls.map(ctrl =>
            <BuildControl
                removed={() => props.ingredientRemoved(ctrl.type)}
                added={() => props.ingredientAdded(ctrl.type)} 
                key={ctrl.type} 
                label={ctrl.label}
                disabled={props.disabledInfo[ctrl.type]} />
        )}
    </div>;
export default buildControls;