import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import { connect } from 'react-redux';

import Home from '../../components/Home';
import Header from '../../components/Header';

class ProtectedLayout extends Component {
  render() {
    const { userIsAuthorized } = this.props;

    if (!userIsAuthorized) {
      navigate('/login');
      return null;
    }

    return (
      <>
        <Header />
        <main className="app__container">
          <Router>
            <Home path="/" />
          </Router>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userIsAuthorized: state.app.userIsAuthorized,
});

export default connect(mapStateToProps)(ProtectedLayout);
