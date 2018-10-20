import React from 'react';
import { connect } from 'react-redux';
import { appChangeLocation } from '../actions/app';
import Button from '../components/Button';

export default connect(
  state => ({ checkout: state.checkout }),
  {
    appChangeLocation,
  }
)(
  ({ checkout, appChangeLocation }) =>
    checkout.currentStepIndex > 0 && checkout.submitted === false ? (
      <Button
        noBorder
        onClick={() => appChangeLocation(`/checkout/${checkout.currentStep}`)}
      >
        Resume checkout
      </Button>
    ) : null
);
