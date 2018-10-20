import React from 'react';

export default ({ address }) => {
  return (
    <div>
      <p>
        {address.firstName} {address.lastName}
      </p>
      <p>{address.street}</p>
      <p>
        {address.zip} {address.city}
      </p>
    </div>
  );
};
