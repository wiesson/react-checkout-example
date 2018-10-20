import {
  CHECKOUT_SUBMIT,
  CHECKOUT_SET_STEP,
  CHECKOUT_START,
  CHECKOUT_CLOSE,
  CHECKOUT_SELECT_PAYMENT_METHOD,
  CHECKOUT_SET_ADDRESS,
  CHECKOUT_SET_ADDRESS_FIELD,
  CHECKOUT_SET_PAYMENT_CARD,
} from '../actions/checkout';

export const steps = [
  { location: 'auth', title: 'Auth', showInNavigation: true },
  { location: 'delivery', title: 'Delivery', showInNavigation: true },
  { location: 'payment', title: 'Payment', showInNavigation: true },
  { location: 'confirmation', title: 'Confirmation', showInNavigation: true },
  { location: 'success', title: 'Thanks for Shopping', showInNavigation: true },
];

export const initialState = {
  steps,
  currentStep: steps[0].location,
  currentStepIndex: 0,
  submitted: false,
  paymentMethod: '',
  addresses: {},
  paymentSource: {},
  cart: [],
};

const setAddress = (addresses = {}, addressType, address) => ({
  ...addresses,
  [addressType]: address,
});

const setAddressField = (addresses = {}, addressType, field, value) => ({
  ...addresses,
  [addressType]: {
    ...addresses[addressType],
    [field]: value,
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_START:
    case CHECKOUT_CLOSE:
      return initialState;

    case CHECKOUT_SET_STEP: {
      const currentStepIndexResult = state.steps.findIndex(
        s => s.location === action.payload
      );

      const currentStepIndex =
        currentStepIndexResult >= 0 ? currentStepIndexResult : 0;

      return {
        ...state,
        currentStepIndex,
        currentStep: state.steps[currentStepIndex].location,
      };
    }

    case CHECKOUT_SELECT_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CHECKOUT_SET_ADDRESS: {
      return {
        ...state,
        addresses: setAddress(
          state.addresses,
          action.payload.addressType,
          action.payload.address
        ),
      };
    }

    case CHECKOUT_SET_ADDRESS_FIELD:
      return {
        ...state,
        addresses: setAddressField(
          state.addresses,
          action.payload.addressType,
          action.payload.field,
          action.payload.value
        ),
      };

    case CHECKOUT_SET_PAYMENT_CARD: {
      return {
        ...state,
        paymentSource: action.payload,
      };
    }

    case CHECKOUT_SUBMIT:
      return {
        steps: [steps[4]],
        currentStepIndex: 0,
        submitted: true,
      };

    default:
      return state;
  }
};
