import { sleep } from './checkout';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_AUTH_FROM_LOCAL_STORAGE = 'USER_AUTH_FROM_LOCAL_STORAGE';

export const USER_LOGIN_FETCH_SUCCEEDED = 'USER_LOGIN_FETCH_SUCCEEDED ';
export const USER_LOGIN_FETCH_FAILED = 'USER_LOGIN_FETCH_FAILED ';
export const USER_LOGIN_FETCH_REQUESTED = 'USER_LOGIN_FETCH_REQUESTED ';

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const userLoginFromLocalStorage = () => ({
  type: USER_AUTH_FROM_LOCAL_STORAGE,
});

export const userLogin = () => async dispatch => {
  dispatch({
    type: USER_LOGIN_FETCH_REQUESTED,
  });

  try {
    await sleep(250);
    dispatch({
      type: USER_LOGIN_FETCH_SUCCEEDED,
      payload: true,
    });
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FETCH_FAILED,
    });
  }
};
