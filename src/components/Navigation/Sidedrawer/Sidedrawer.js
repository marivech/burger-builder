import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import ToggleButton from '../../UI/ToggleButton/ToggleButton';

const sidedrawer = props => {
    const visibleState = props.isOpen ? classes.Open : classes.Close;
    return (
        <Aux>
            <Backdrop show={props.isOpen} clicked={props.hideSidedrawer} />
            <section className={`${classes.Sidedrawer} ${visibleState}`} onClick={props.hideSidedrawer}>
                <ToggleButton viewState='opened' clicked={ props.hideSidedrawer }/>
                <Logo size='large' />
                <nav>
                    <NavigationItems isAuthed={props.isAuthed} />
                </nav>
            </section>
        </Aux>
    );
};
export default sidedrawer;