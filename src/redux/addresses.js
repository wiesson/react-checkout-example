// initial state
const initialState = [
  {
    id: 21,
    firstName: 'Jacqueline',
    lastName: 'Talon',
    street: 'Bergrain 110',
    city: 'Châtaignier',
    zip: '1926',
    country: 'Switzerland',
  },
  {
    id: 22,
    firstName: 'Bertrand',
    lastName: 'Despins',
    street: 'Breitenstrasse 70',
    city: 'Basel',
    zip: '4025',
    country: 'Switzerland',
  },
  {
    id: 23,
    firstName: 'Steffen',
    lastName: 'Fuchs',
    street: 'Strickstrasse 31',
    city: 'Zumikon',
    zip: '8126',
    country: 'Switzerland',
  },
  {
    id: 24,
    firstName: 'Steffen',
    lastName: 'Fuchs',
    street: 'Weinfeldenring 3b',
    city: 'Altdorf',
    zip: '3123',
    country: 'Switzerland',
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
