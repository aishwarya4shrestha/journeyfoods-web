/* 
  src/reducers/auth.reducer.js
*/

import { Actions } from '../constants/actions';

import * as tokenService from '../service/token.service';
import { IUser, IAuthentication } from '../components/interface/auth.interface';

interface IToken {
  access_token: string;
  refresh_token: string;
}

function setTokenOnLocalStorage(token: IToken) {
  tokenService.setAccessToken(token.access_token);
  tokenService.setRefreshToken(token.refresh_token);
}

function setRoleOnLocalStorage(role: string) {
  tokenService.setRole(role);
}

let { userDetails } = getUserDetailsFromLocalStorage();

export const initialState: IAuthentication = {
  requestingUser: false,
  isLoggedIn: tokenService.getAccessToken() ? true : false,
  role: ''
};

export const initialUserDetail: IUser = {
  name: ''
};

function getUserDetailsFromLocalStorage(): { userDetails: IUser } {
  userDetails = tokenService.getUserDetails() || initialUserDetail;

  return { userDetails };
}

export default function(state: IAuthentication = initialState, action: any): IAuthentication {
  switch (action.type) {
    case Actions.authActions.LOGIN_REQUEST:
      return { ...state };

    case Actions.authActions.LOGIN_SUCCESS:
      setTokenOnLocalStorage(action.payload);
      setRoleOnLocalStorage(action.payload.role);
      return {
        ...state,
        isLoggedIn: tokenService.getAccessToken() ? true : false,
        role: tokenService.getRole() ? tokenService.getRole() : ''
      };

    case Actions.authActions.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false
      };

    case Actions.authActions.SET_TOKEN:
      setTokenOnLocalStorage(action.payload);
      return {
        ...state
      };

    case Actions.authActions.SET_ROLE:
      setRoleOnLocalStorage(action.payload);
      return {
        ...state
      };

    case Actions.authActions.CLEAR_STATE:
      return {
        requestingUser: false,
        isLoggedIn: false,
        role: ''
      };

    default:
      return state;
  }
}
