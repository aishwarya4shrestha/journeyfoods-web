import React from 'react';
import { History } from 'history';
import { ToastContainer } from 'react-toastify';
import { ConnectedRouter } from 'connected-react-router';

import AppRouter from './AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

interface IApp {
  history: History;
}

const App: React.FC<IApp> = ({ history }) => (
  <ConnectedRouter history={history}>
    <ToastContainer />
    <AppRouter />
  </ConnectedRouter>
);

export default App;
