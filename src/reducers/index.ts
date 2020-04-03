import { History } from 'history';
import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';

import adminReducer from './admin.reducer';
import overviewReducer from './overview.reducer'; //TODO
import authReducer from './auth.reducer';
import dashboardReducer from './dashboard.reducer';

export interface ReduxState {
  router: RouterState;
}

/**
 * Creates a combination of all the reducers for the application
 * @param {History} history History object
 */
const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    adminReducer,
    overviewReducer,
    authReducer,
    dashboardReducer
  });

export interface ISimpleReducer {}
export interface IOverviewReducer {}
export interface IAdminReducer {
  reports: any;
  selectedReportId: number;
  selectedReport: any;
}

export interface IDashboardReducer {
  searchResult: any[];
}

export interface IAppplicationState {
  router: RouterState;
  overviewReducer: IOverviewReducer;
  authReducer: any;
  adminReducer: IAdminReducer;
  dashboardReducer: IDashboardReducer;
}

export default createRootReducer;
