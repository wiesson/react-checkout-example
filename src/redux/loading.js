import {
  USER_FETCH_FAILED,
  USER_FETCH_REQUESTED,
  USER_FETCH_SUCCEEDED,
} from '../actions/checkout';
import { APP_LOADING } from '../actions/app';

const initialState = {
  checkout: false,
  user: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return {
        ...state,
        checkout: action.payload,
      };

    case USER_FETCH_REQUESTED: {
      return {
        ...state,
        checkout: true,
      };
    }

    case USER_FETCH_SUCCEEDED:
    case USER_FETCH_FAILED:
      return {
        ...state,
        checkout: false,
      };
    default:
      return state;
  }
};
