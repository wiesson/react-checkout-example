// initial state
const initialState = [
  {
    id: 31,
    last4: '4242',
    brand: 'visa',
    type: 'creditcard',
  },
  {
    id: 32,
    last4: '4444',
    brand: 'mastercard',
  },
  {
    id: 33,
    last4: '0005',
    brand: 'amex',
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
