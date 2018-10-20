import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../redux/rootReducer';
import auth from '../middleware/auth';
import thunk from 'redux-thunk';

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, auth))
  );
};

export default configureStore;
