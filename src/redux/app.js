import { APP_SERVICE_WORKER_DID_UPDATE, APP_TOKEN } from '../actions/app';
import { USER_LOGOUT } from '../actions/user';

const initialState = {
  token: null,
  serviceWorkerDidUpdate: false,
  userIsAuthorized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_TOKEN: {
      return {
        token: action.payload,
        userIsAuthorized: true,
      };
    }
    case USER_LOGOUT: {
      return initialState;
    }
    case APP_SERVICE_WORKER_DID_UPDATE: {
      return {
        ...state,
        serviceWorkerDidUpdate: true,
      };
    }
    default: {
      return state;
    }
  }
};
