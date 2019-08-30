import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';
import classes from './Layout.module.css'

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    showSideDrawerHandler = () => {
        this.setState({ showSideDrawer: true });
    };

    hideSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    render() {
        return (
            <Aux>
                <Sidedrawer
                    isOpen={ this.state.showSideDrawer }
                    hideSidedrawer={ this.hideSideDrawerHandler }/>
                <Toolbar showSidedrawer={ this.showSideDrawerHandler }/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

export default Layout;