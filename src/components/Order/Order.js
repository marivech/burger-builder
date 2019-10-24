import React from 'react';
import classes from './Order.module.css';

const order = ({ ingredients, price }) => {
    const ingArr = Object.entries(ingredients);
    return (
        <section className={classes.Order}>
            <span>Ingredients:</span>
            <ul className={classes.IngredientsList}>
            {ingArr.map(([name, amount], i) => 
                <li key={`${name}_${i}`}>
                    <span>{name}: </span>
                    <span>{amount}</span>
                </li>
            )}</ul>
            <p>Price: <span className={classes.Price}>{price}</span></p>
        </section>
    )
};
export default order;