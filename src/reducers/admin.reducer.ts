/* 
  src/reducers/admin.reducer.js
*/

import { Actions } from '../constants/actions';

export interface IOverviewReducer {
  allReports: any;
  loggedinUserReports: any;
  selectedReportId: any | string | number; //TODO Change here
  selectedReport: any;
  currentUser: any;
}

interface ICurrentUser {
  admin: string;
  authorized: string;
  password_reset?: any;
  city: string;
  company_logo: string;
  company: string;
  company_types?: any;
  idtoken: string;
  idtokentimestamp: number | string;
  ingredients_only: string;
  insightemails?: any;
  name: string;
  portfolio_image?: any;
  preferences: string;
  product_types?: any;
  products?: any;
  refreshtoken: string;
  reports?: any;
  reportsonly: any;
  state: string;
  subscribed_ingredients: string;
  subsription_tier: string;
  team: any;
  user_photo: string;
  watched_ingredients: string;
  creation_date: string;
  modified_date: string;
  email: string;
  null: any;
  unique_id: string;
  active_ingredients: string;
}
const initialState: IOverviewReducer = {
  allReports: [],
  selectedReportId: '',
  selectedReport: {},
  currentUser: {},
  loggedinUserReports: []
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.adminActions.SET_REPORT:
      return {
        ...state,
        allReports: [...action.payload]
      };

    case Actions.adminActions.ADD_NEW_REPORT:
      return {
        ...state,
        allReports: [...state.allReports, action.payload]
      };

    case Actions.adminActions.ADD_LOGGEDIN_USER_NEW_REPORT:
      return {
        ...state,
        loggedinUserReports: [...state.loggedinUserReports, action.payload]
      };

    case Actions.adminActions.SELECT_REPORT:
      return {
        ...state,
        selectedReportId: action.payload,
        selectedReport: state.allReports.find((item: any) => item.id == action.payload) //TODO
      };

    case Actions.adminActions.UPDATE_REPORT:
      return {
        ...state,
        allReports: [...state.allReports, action.payload]
      };

    case Actions.adminActions.SET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case Actions.adminActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    case Actions.adminActions.SET_LOGGEDIN_USER_REPORT:
      return {
        ...state,
        loggedinUserReports: [...action.payload]
      };

    default:
      return state;
  }
};
