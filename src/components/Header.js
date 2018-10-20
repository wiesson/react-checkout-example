import React from 'react';
import { Link } from '@reach/router';

import ServiceWorkerDidUpdate from '../containers/helper/ServiceWorkerDidUpdate';
import AbandonedCheckout from '../containers/AbandonedCheckout';
import styles from './Header.module.css';
import buttonStyles from './Button.module.css';

const linkStyles = [
  buttonStyles.button,
  buttonStyles.raised,
  buttonStyles.noBorder,
].join(' ');

export default () => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <nav className={styles.nav}>
        <Link className={linkStyles} to="/">
          Home
        </Link>
        <Link className={linkStyles} to="/checkout">
          Checkout
        </Link>
      </nav>
      <div className={styles.positionSecondary}>
        <AbandonedCheckout />
        <ServiceWorkerDidUpdate />
      </div>
    </div>
  </header>
);
