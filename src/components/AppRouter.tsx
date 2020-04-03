import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './login';
import Dashboard from './dashboard';
import PrivateRoute from './common/PrivateRoute';
import { HOME, LOGIN } from '../constants/routes';

let Design: any;
if (process.env.NODE_ENV === 'development') {
  Design = React.lazy(() => import('../components/design'));
}

const AppRouter: React.SFC<{}> = () => (
  <Switch>
    {Design && <Route path="/design" component={Design} />}

    <Route exact path={LOGIN} component={Login} />

    <PrivateRoute path={HOME} component={Dashboard} />
    {/* </React.Suspense> */}
  </Switch>
);

export default AppRouter;
