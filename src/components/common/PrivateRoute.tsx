import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import * as routes from '../../constants/routes'; //TODO Change export

interface IPrivateRouteProps {
  path: any;
  component: any;
  isLoggedIn: boolean;
}

const PrivateRoute: React.SFC<IPrivateRouteProps> = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (isLoggedIn ? <Component {...props} /> : <Redirect to={routes.LOGIN} />)} />
  );
};

const mapStateToProps = (store: any) => {
  const {
    authReducer: { isLoggedIn }
  } = store;
  return {
    isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
