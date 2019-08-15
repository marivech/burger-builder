import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    // get array with corresponding to number of items
    // e.g. [cheese, meat, meat, bacon]
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey =>
            [...Array(props.ingredients[igKey])]
                .map((_, i) => (
                    <BurgerIngredient type={igKey} key={`${igKey}${i}`}/>
            ))
        )
        .flat();
    const alert = transformedIngredients.length > 0 ? null : <li className={classes.s}>Start edit your burger!</li>
    return (
        <figure className={classes.Burger}>
            <figcaption>Your order:</figcaption>
            <ul>
                <BurgerIngredient type='bread-top' />
                {transformedIngredients}
                {alert}
                <BurgerIngredient type='bread-bottom' />
            </ul>
        </figure>
    )
};
export default burger;