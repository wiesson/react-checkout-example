import React from 'react';
import { Router, Link } from "@reach/router";
import CloseToHome from '../helper/CloseToHome';
import CheckoutSteps from '../CheckoutSteps';

const CheckoutLayout = () => (
  <div className="app__container">
    <CloseToHome />

    <Router>
      <CheckoutSteps path=":step" />
      <CheckoutSteps path="/" />
    </Router>

    <Link to={'/'}>Back to profile</Link>
  </div>
);

export default CheckoutLayout;
