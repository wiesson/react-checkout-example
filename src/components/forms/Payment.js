import './Form.css';

import React, { Component } from 'react';
import './Form.css';
import PaymentSelector from '../selector/PaymentSelector';
import Button from '../Button';

export const PAYMENT_PROVIDER_PAYPAL = 'PAYMENT_PROVIDER_PAYPAL';
export const PAYMENT_PROVIDER_STRIPE = 'PAYMENT_PROVIDER_STRIPE';

const CreditCardForm = () => (
  <div>
    <div className="form-control__group">
      <label className="form-control__label" htmlFor="">
        Card Number
      </label>
      <input
        required
        type="number"
        className="form-control"
        minLength={15}
        maxLength={16}
      />
    </div>

    <div className="form-control__group">
      <label className="form-control__label" htmlFor="">
        Valid To
      </label>
      <input required className="form-control" type="date" />
    </div>

    <div className="form-control__group">
      <label className="form-control__label" htmlFor="">
        CVC
      </label>
      <input
        required
        type="number"
        className="form-control"
        minLength={3}
        maxLength={3}
      />
    </div>
  </div>
);

class Payment extends Component {
  handlePaymentSelect(paymentMethod) {
    if (this.props.checkout.paymentMethod === paymentMethod) {
      this.props.handlePaymentSelect('');
      return;
    }
    this.props.handlePaymentSelect(paymentMethod);
  }

  render() {
    const { paymentMethod } = this.props.checkout;

    return (
      <div>
        <Button
          active={paymentMethod === PAYMENT_PROVIDER_PAYPAL}
          onClick={() => this.handlePaymentSelect(PAYMENT_PROVIDER_PAYPAL)}
        >
          Paypal
        </Button>
        {'\n'}
        <Button
          active={paymentMethod === PAYMENT_PROVIDER_STRIPE}
          onClick={() => this.handlePaymentSelect(PAYMENT_PROVIDER_STRIPE)}
        >
          CreditCard
        </Button>

        <hr className="hr" />

        {paymentMethod === PAYMENT_PROVIDER_STRIPE ? (
          <div>
            <PaymentSelector
              payments={this.props.payments}
              paymentSource={this.props.paymentSource}
              checkoutSetPaymentCard={this.props.checkoutSetPaymentCard}
            />
            {this.props.paymentSource ? null : <CreditCardForm />}
          </div>
        ) : null}

        {paymentMethod === PAYMENT_PROVIDER_PAYPAL ? (
          <p>
            Forwarding to PayPal takes place at the end of the order process for
            payment processing. The order is then successfully completed.
          </p>
        ) : null}
      </div>
    );
  }
}

export default Payment;
