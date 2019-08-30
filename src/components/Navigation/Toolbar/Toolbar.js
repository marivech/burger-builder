import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../../UI/ToggleButton/ToggleButton';
import classes from './Toolbar.module.css';

const toolbar = props => (
    <header className={ classes.Toolbar }>
        <ToggleButton viewState='closed' clicked={ props.showSidedrawer }/>
        <Logo size='small' />
        <nav className={ classes.DesktopOnly }><NavigationItems /></nav>
    </header>
);
export default toolbar;