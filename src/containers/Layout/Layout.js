import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import classes from './Layout.module.css'
import { connect } from 'react-redux';

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
                    hideSidedrawer={ this.hideSideDrawerHandler }
                    isAuthed={this.props.isAuthed}/>
                <Toolbar
                    showSidedrawer={ this.showSideDrawerHandler }
                    isAuthed={this.props.isAuthed} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);