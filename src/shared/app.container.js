require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from './notification.container';
import Authorized from '../authed/authorized.container';
import Unauthorized from '../unauthed/unauthorized.component';
import Header from '../authed/header.component';

import { verifyToken } from './api.actions';

class App extends Component {
  componentDidMount() {
    const { dispatch, isAuthenticated } = this.props;
    if (isAuthenticated) {
      dispatch(verifyToken());
    }
  }

  resolveComponent() {
    const { isAuthenticated, dispatch } = this.props;

    if (isAuthenticated) {
      return <Authorized />
    } else {
      return <Unauthorized dispatch={dispatch} />
    }
  }

  render() {
    const { isAuthenticated, dispatch, username } = this.props;

    return (
      <div>
        {(isAuthenticated) ? <Header
          dispatch={dispatch}
          username={username}
          /> : null}
        {this.resolveComponent()}
        <Notification />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, username } = state.auth;

  return {
    username: username,
    isAuthenticated: isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
