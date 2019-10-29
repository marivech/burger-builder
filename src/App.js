import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/logout' component={Logout} />
            <Route path='/auth' component={Auth} />
            <Route path='/orders' component={Orders} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.checkAuthState()),
  }
}
export default connect(null, mapDispatchToProps)(App);
