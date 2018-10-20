import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { userLoginFromLocalStorage } from './actions/user';
import { loadState, saveState } from './middleware/localStorage';
import { serviceWorkerDidUpdate } from './actions/app';

const preloadedState = loadState();
export const store = configureStore(preloadedState);

store.dispatch(userLoginFromLocalStorage());
store.subscribe(() => saveState({ checkout: store.getState().checkout }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker(() => store.dispatch(serviceWorkerDidUpdate()));
