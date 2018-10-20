import { navigate } from "@reach/router"
import { appSetLoadingState } from './app';

export const CHECKOUT_SUBMIT = 'CHECKOUT_SUBMIT';
export const CHECKOUT_SET_STEP = 'CHECKOUT_SET_STEP';
export const CHECKOUT_START = 'CHECKOUT_START';
export const CHECKOUT_SELECT_PAYMENT_METHOD = 'CHECKOUT_SELECT_PAYMENT_METHOD';

export const USER_FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED';
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED';
export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED';

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const checkoutStart = () => async (dispatch, getState) => {
  const userIsAuthorized = getState().app.userIsAuthorized;
  const nextStep = userIsAuthorized ? 'delivery' : 'auth';
  await dispatch({ type: CHECKOUT_START });
  await dispatch(() => navigate(`/checkout/${nextStep}`));
};

export const checkoutStep = redirect => async dispatch => {
  dispatch(appSetLoadingState(true));
  try {
    await sleep(150);
    await dispatch(checkoutSetStep(redirect));
    await dispatch(() => navigate(`/checkout/${redirect}`));
    await dispatch(appSetLoadingState(false));
  } catch (err) {
    console.log(err);
  }
};

export const checkoutSetStep = step => ({
  type: CHECKOUT_SET_STEP,
  payload: step,
});

export const checkoutSubmit = (redirect, hasPayedWithPaypal) => async dispatch => {
  if (hasPayedWithPaypal) {
    if (window.confirm('Submit and pay with Paypal?')) {
      return await dispatch(checkoutStep(redirect)).then(
        dispatch(checkoutSetSubmit())
      );
    }
    return Promise.resolve();
  }

  return await dispatch(checkoutStep(redirect)).then(dispatch(checkoutSetSubmit()));
};

export const checkoutSetSubmit = () => ({
  type: CHECKOUT_SUBMIT,
});

export const CHECKOUT_CLOSE = 'CHECKOUT_CLOSE';
export const checkoutClose = () => async dispatch => {
  await dispatch(() => navigate('/'));
  await dispatch({ type: CHECKOUT_CLOSE });
};

export const checkoutSelectPaymentMethod = payload => ({
  type: CHECKOUT_SELECT_PAYMENT_METHOD,
  payload,
});

export const CHECKOUT_SET_PAYMENT_CARD = 'CHECKOUT_SET_PAYMENT_CARD';
export const checkoutSetPaymentCard = payload => ({
  type: CHECKOUT_SET_PAYMENT_CARD,
  payload,
});

export const CHECKOUT_SET_ADDRESS = 'CHECKOUT_SET_ADDRESS';
export const checkoutSetAddress = payload => ({
  type: CHECKOUT_SET_ADDRESS,
  payload,
});

export const CHECKOUT_SET_ADDRESS_FIELD = 'CHECKOUT_SET_ADDRESS_FIELD';
export const checkoutSetAddressField = payload => ({
  type: CHECKOUT_SET_ADDRESS_FIELD,
  payload,
});
