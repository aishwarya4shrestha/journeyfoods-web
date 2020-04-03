import React from 'react';
import { Switch, Route } from 'react-router';
import { ADMIN_ROLE } from '../../constants/appConstant';

import {
  HOME,
  DETAILS,
  REPORT,
  PROFILE,
  ADMIN,
  ADD_PRODUCT,
  ADMIN_ANALYTICS,
  ADMIN_REPORTS,
  ADMIN_USER_CONTROL,
  ADMIN_USER_CONTROL_USER,
  SEARCH
} from '../../constants/routes';

import Overview from './overview';
import Detail from './detail';
import Report from './report';
import Profile from './profile';
import Admin from './admin/Admin';
import NewProduct from './product/NewProduct';
import Product from './product/Product';

import Authorization from '../../HOC/Authorization';
import Usercontrol from './admin/usercontrol';
import User from './admin/usercontrol/Userinfo';
import Userinfo from './admin/usercontrol/Userinfo';
import SearchedProduct from './product/SearchedProduct';
import SearchResult from '../common/searchResult/SearchResult';
import Analytics from './admin/analytics';

const AdminRole = Authorization([ADMIN_ROLE]);

const DashboardRouters: React.SFC<{}> = () => (
  <Switch>
    <Route exact path={ADMIN} component={AdminRole(Admin)} />
    <Route exact path={ADMIN_ANALYTICS} component={AdminRole(Analytics)} />
    <Route exact path={ADMIN_REPORTS} component={AdminRole(Report)} />
    <Route exact path={ADMIN_USER_CONTROL} component={AdminRole(Usercontrol)} />
    <Route exact path={`${ADMIN_USER_CONTROL}/:id`} component={AdminRole(Userinfo)} />

    <Route exact path="/products/:id" component={Product} />

    <Route exact path={HOME} component={Overview} />
    <Route exact path={DETAILS} component={Detail} />
    <Route exact path={REPORT} component={Report} />
    <Route exact path={PROFILE} component={Profile} />
    <Route exact path={ADD_PRODUCT} component={NewProduct} />
    <Route exact path={ADMIN_USER_CONTROL_USER} component={User} />

    <Route exact path="/ingredient/:id" component={SearchedProduct} />
    <Route exact path="/search" component={SearchResult} />
  </Switch>
);

export default DashboardRouters;
