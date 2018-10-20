import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../redux/rootReducer';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import auth from '../middleware/auth';
import { createHistory } from '@reach/router';

export const history = createHistory(window);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, logger, auth))
  );
};

export default configureStore;
