import React from 'react';
import { connect } from 'react-redux';
import { checkoutClose } from '../../actions/checkout';

export default connect(null, { checkoutClose })(({ checkoutClose }) => (
  <button
    className="navigation-close abs"
    onClick={() =>
      window.confirm('Do you really want to leave the checkout?')
        ? checkoutClose()
        : null
    }
  >
    ✕
  </button>
));
