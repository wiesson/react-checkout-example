import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaymentSelector extends Component {
  handlePaymentChange = ev => {
    const { value } = ev.target;
    if (value) {
      const paymentId = parseInt(ev.target.value, 10);
      const payment = this.props.payments.find(p => p.id === paymentId);

      if (!payment) {
        return;
      }

      this.props.checkoutSetPaymentCard(payment);
      return;
    }

    this.props.checkoutSetPaymentCard();
  };

  componentWillMount() {
    const { payment, payments = [] } = this.props;
    if (payments && payments.length === 0) {
      return;
    }

    if (payment && payment.hasOwnProperty('id')) {
      return;
    }

    if (payment) {
      return;
    }

    this.props.checkoutSetPaymentCard(payments[0]);
  }

  render() {
    const { paymentSource, payments = [], checkoutSetPaymentCard } = this.props;
    const paymentId =
      paymentSource && paymentSource.hasOwnProperty('id')
        ? paymentSource.id
        : '';
    const optionList = payments.map(a => (
      <option key={`addressId${a.id}`} value={a.id}>
        XXXX XXXX XXXX XXXX {a.last4}, {a.brand}
      </option>
    ));

    return (
      <div className="form-control__group">
        <select
          className="form-control"
          name=""
          id=""
          onChange={this.handlePaymentChange}
          value={paymentId}
        >
          {optionList}
          <option value="">-- Use other credit card --</option>
        </select>

        {paymentId ? (
          <span
            className="link link__form"
            onClick={() => checkoutSetPaymentCard(undefined)}
          >
            Use other credit card
          </span>
        ) : null}
      </div>
    );
  }
}

PaymentSelector.propTypes = {
  checkoutSetPaymentCard: PropTypes.func.isRequired,
  paymentSource: PropTypes.object,
  payments: PropTypes.array,
};

export default PaymentSelector;
