import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  checkoutStart,
  checkoutStep,
  checkoutSubmit,
  checkoutClose,
  checkoutSelectPaymentMethod,
  checkoutSetAddress,
  checkoutSetAddressField,
  checkoutSetPaymentCard,
} from '../actions/checkout';
import { connect } from 'react-redux';
import Address from '../components/forms/Address';
import Payment, { PAYMENT_PROVIDER_PAYPAL } from '../components/forms/Payment';
import Login from './Login';
import Button from '../components/Button';
import AddressSelector from '../components/selector/AddressSelector';
import AddressPresenter from '../components/AddressPresenter';
import CardPresenter from '../components/CardPresenter';

class CheckoutSteps extends Component {
  redirectUserIfAuthorized = props => {
    if (props.isLoading === false && props.userIsAuthorized) {
      if (props.step === undefined || props.step === 'auth') {
        props.checkoutStep('delivery');
      }
    }
  };

  redirectUserBackToSuccess = props =>
    props.checkout.submitted && props.step !== 'success'
      ? props.checkoutStep('success')
      : null;

  handleFormButtonStepClick(ev, step, paymentMethod) {
    ev.preventDefault();

    if (step.location === 'success') {
      this.props.checkoutSubmit(
        step.location,
        paymentMethod === PAYMENT_PROVIDER_PAYPAL
      );
      return;
    }

    this.props.checkoutStep(step.location);
  }

  componentDidMount() {
    this.redirectUserIfAuthorized(this.props);
  }

  componentDidUpdate() {
    this.redirectUserBackToSuccess(this.props);
  }

  componentWillUnmount() {
    if (this.props.checkout.currentStep === 'success') {
      this.props.checkoutClose();
    }
  }

  checkStepsCompleted = location => {
    const { checkout } = this.props;
    if (location === 'auth') {
      return this.props.userIsAuthorized;
    }

    if (location === 'delivery') {
      const { delivery } = checkout.addresses;
      if (!delivery) {
        return false;
      }

      const { id, ...address } = delivery;

      return (
        Object.keys(address || {}).length === 6 &&
        Object.values(address).every(f => f && f !== '' && f.length >= 2)
      );
    }

    if (location === 'payment') {
      return checkout.paymentMethod !== '';
    }

    return true;
  };

  checkoutSucceeded = () => {
    return (
      <div className="checkout">
        <p>
          <span role="img" aria-label="parcel image">
            📦
          </span>{' '}
          Thanks for shopping! Have a nice day :)
        </p>
        <Button className="button" onClick={this.props.checkoutClose}>
          Back to home
        </Button>
      </div>
    );
  };

  render() {
    const {
      isLoading,
      currentStep,
      nextStep,
      prevStep,
      isLastStep,
      userIsAuthorized,
      checkout,
    } = this.props;

    if (!currentStep) {
      return <div>Sorry, but the step was not found</div>;
    }

    if (currentStep.location === 'success') {
      return this.checkoutSucceeded();
    }

    if (currentStep.location === 'auth' && userIsAuthorized) {
      this.props.checkoutStep('delivery');
      return null;
    }

    return (
      <form className="checkout">
        <div className="checkout__navigation">
          {prevStep ? (
            <Button
              loading={isLoading}
              disabled={!prevStep}
              onClick={ev => this.handleFormButtonStepClick(ev, prevStep)}
            >
              {`Prev: ${prevStep.location}`}
            </Button>
          ) : (
            <div />
          )}

          {nextStep ? (
            <Button
              loading={isLoading}
              disabled={
                !nextStep || !this.checkStepsCompleted(currentStep.location)
              }
              onClick={ev =>
                this.handleFormButtonStepClick(
                  ev,
                  nextStep,
                  checkout.paymentMethod
                )
              }
            >
              {isLastStep
                ? checkout.paymentMethod === PAYMENT_PROVIDER_PAYPAL
                  ? 'Buy with Paypal'
                  : 'Buy'
                : `Next: ${nextStep.location}`}
            </Button>
          ) : (
            <div />
          )}
        </div>

        <h3>{currentStep.title}</h3>

        {currentStep.location === 'auth' ? (
          <div>
            <Login onSuccess={nextStep.location} />
          </div>
        ) : null}

        {currentStep.location === 'delivery' ? (
          <div>
            <h4>Where should we send the delivery?</h4>
            <AddressSelector
              setAddress={this.props.checkoutSetAddress}
              addresses={this.props.addresses}
              address={checkout.addresses.delivery}
            />

            {checkout.addresses.delivery &&
            checkout.addresses.delivery.hasOwnProperty('id') ? null : (
              <Address
                setAddressField={this.props.checkoutSetAddressField}
                address={checkout.addresses.delivery}
              />
            )}
          </div>
        ) : null}

        {currentStep.location === 'payment' ? (
          <div>
            <h4>Choose your payment provider</h4>
            <Payment
              paymentSource={checkout.paymentSource}
              handlePaymentSelect={this.props.checkoutSelectPaymentMethod}
              checkoutSetPaymentCard={this.props.checkoutSetPaymentCard}
              checkout={this.props.checkout}
              payments={this.props.payments}
            />
          </div>
        ) : null}

        {currentStep.location === 'confirmation' ? (
          <div>
            <div>Step auth: {this.props.userIsAuthorized ? 'OK' : 'x'}</div>
            <div>
              <h4>Delivery address</h4>
              <AddressPresenter address={checkout.addresses.delivery} />
            </div>
            <div>
              <h4>Payment</h4>
              {checkout.paymentMethod === PAYMENT_PROVIDER_PAYPAL ? (
                'Paypal'
              ) : (
                <CardPresenter card={checkout.paymentSource} />
              )}
            </div>
          </div>
        ) : null}

        {currentStep.location === 'paypal' ? (
          <div>
            <Button
              onClick={() => this.props.checkoutSubmit(nextStep.location)}
              loading={!!isLoading}
            >
              Pay with Paypal
            </Button>
          </div>
        ) : null}
      </form>
    );
  }
}

CheckoutSteps.propTypes = {
  checkout: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const stepIndexResult = state.checkout.steps.findIndex(
    s => s.location === ownProps.step
  );
  const stepIndex = stepIndexResult === -1 ? 0 : stepIndexResult;

  const currentStep = state.checkout.steps[stepIndex];
  const isLastStep = currentStep.location === 'confirmation';
  const isSuccessStep = currentStep.location === 'success';

  return {
    userIsAuthorized: state.app.userIsAuthorized,
    currentStep,
    nextStep: state.checkout.steps[stepIndex + 1],
    prevStep:
      stepIndex > 1 && !isSuccessStep
        ? state.checkout.steps[stepIndex - 1]
        : null,
    isLastStep,
    isLoading: state.loading.checkout,
    checkout: state.checkout,
    stepIndex,
    addresses: state.addresses,
    payments: state.payments,
  };
};

const mapDispatchToProps = {
  checkoutStart,
  checkoutStep,
  checkoutSubmit,
  checkoutClose,
  checkoutSelectPaymentMethod,
  checkoutSetAddress,
  checkoutSetAddressField,
  checkoutSetPaymentCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutSteps);
