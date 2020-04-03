import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './public';
import App from './components/App';
import configureStore from './store';
import history from './utils/history';
import './assets/styles/sass/vendor/bootstrap.rtl.only.min.css';

import * as serviceWorker from './serviceWorker';

import('./assets/styles/sass/themes/gogo.' + 'light.purple' + '.scss');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
