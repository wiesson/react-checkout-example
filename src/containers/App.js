import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Loadable from 'react-loadable';
import Login from './Login';

const Loading = () => <div>Loading...</div>;

const CheckoutLayout = Loadable({
  loader: () => import('./views/CheckoutLayout'),
  loading: Loading,
});

const Protected = Loadable({
  loader: () => import('./views/ProtectedLayout'),
  loading: Loading,
});

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <CheckoutLayout path="/checkout/*" />
          <Protected path="/*" />
        </Router>
      </div>
    );
  }
}

export default App;
