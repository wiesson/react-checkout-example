import React from 'react';
import styles from './Button.module.css';

export default ({
  onClick,
  loading = false,
  active = false,
  disabled = false,
  children,
  props,
}) => (
  <button
    type="button"
    disabled={loading === true || disabled}
    onClick={onClick ? onClick : undefined}
    className={[
      styles.button,
      styles.raised,
      loading === true || disabled ? styles.disabled : undefined,
      loading ? styles.isLoading : undefined,
      active ? styles.selected : undefined,
    ]
      .filter(c => c)
      .join(' ')}
    {...props}
  >
    {children}
  </button>
);
