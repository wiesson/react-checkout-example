import {
  USER_AUTH_FROM_LOCAL_STORAGE,
  USER_LOGIN_FETCH_SUCCEEDED,
  USER_LOGOUT,
} from '../actions/user';
import { APP_TOKEN } from '../actions/app';

const auth = store => next => action => {
  if (action.type === USER_LOGOUT) {
    window.localStorage.removeItem('access_token');
  }

  if (action.type === USER_LOGIN_FETCH_SUCCEEDED) {
    const token = 'ABCDEF123456890';
    window.localStorage.setItem('access_token', token);
    store.dispatch({
      type: APP_TOKEN,
      payload: {
        token,
        userIsAuthorized: true,
      },
    });
  }

  if (action.type === USER_AUTH_FROM_LOCAL_STORAGE) {
    const token = window.localStorage.getItem('access_token');
    if (token) {
      store.dispatch({
        type: APP_TOKEN,
        payload: {
          token,
          userIsAuthorized: true,
        },
      });
    }
  }

  next(action);
};

export default auth;
