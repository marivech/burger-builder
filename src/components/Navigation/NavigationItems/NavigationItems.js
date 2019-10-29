import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger builder</NavigationItem>
        {props.isAuthed
            ? (
                <>
                <NavigationItem link='/orders'>Orders</NavigationItem>
                <NavigationItem link='/logout'>Logout</NavigationItem>
                </>
            )
            : <NavigationItem link='/auth'>Auth</NavigationItem>
        }
    </ul>
);
export default navigationItems;