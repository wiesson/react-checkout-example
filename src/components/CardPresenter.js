import React from 'react';

export default ({ card = {} }) => (
  <p>
    XXXX XXXX XXXX {card.last4 || 'XXXX'} {card.brand && `, ${card.brand}`}
  </p>
);
