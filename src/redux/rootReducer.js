import { combineReducers } from 'redux';

import app from './app';
import addresses from './addresses';
import checkout from './checkout';
import loading from './loading';
import payments from './payments';

const rootReducer = combineReducers({
  app,
  addresses,
  checkout,
  loading,
  payments,
});

export default rootReducer;
