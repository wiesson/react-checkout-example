import React from 'react';
import { Router } from '@reach/router';
import CheckoutSteps from '../containers/CheckoutSteps';

const Checkout = () => (
  <Router>
    <CheckoutSteps path="/:step" />
  </Router>
);

export default Checkout;
