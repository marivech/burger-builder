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
    <section className={classes.BuildControls}>
        <p>Current price: <span>{props.price.toFixed(2)}</span></p>
        <ul>
            {controls.map(ctrl =>
                <BuildControl
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    added={() => props.ingredientAdded(ctrl.type)} 
                    key={ctrl.type} 
                    label={ctrl.label}
                    disabled={props.disabledInfo[ctrl.type]} />
            )}
        </ul>
        <button
            onClick={props.checkouting}
            className={classes.OrderButton}
            disabled={!props.purchasable}>Order now</button>
    </section>;
export default buildControls;