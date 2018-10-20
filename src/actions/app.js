import { navigate } from '@reach/router';

export const APP_TOKEN = 'APP_TOKEN';
export const APP_LOADING = 'APP_LOADING';

export const appSetToken = token => ({
  type: APP_TOKEN,
  payload: token,
});

export const appSetLoadingState = state => ({
  type: APP_LOADING,
  payload: state,
});

export const appChangeLocation = location => dispatch =>
  dispatch(() => navigate(location));

export const APP_SERVICE_WORKER_DID_UPDATE = 'APP_SERVICE_WORKER_DID_UPDATE';

export const serviceWorkerDidUpdate = () => ({
  type: APP_SERVICE_WORKER_DID_UPDATE,
});
