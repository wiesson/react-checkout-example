import React from 'react';
import { connect } from 'react-redux';

export default connect(state => ({
  serviceWorkerDidUpdate: state.app.serviceWorkerDidUpdate,
}))(
  ({ serviceWorkerDidUpdate }) =>
    serviceWorkerDidUpdate ? (
      <span
        className="button button__cta button--noBr"
        onClick={() => window.location.reload()}
      >
        We updated the application, please refresh the page
      </span>
    ) : null
);
