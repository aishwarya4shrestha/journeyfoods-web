import { Dispatch } from 'redux';
import Axios, { AxiosResponse } from 'axios';
import { stringify } from 'querystring';

import http from '../../utils/http';
import { IAppplicationState } from '../../reducers';
// import { loginSuccess, loginFailure } from "../../actions/auth.actions";
// import { ILogin } from "../../components/interface/auth.interface";
import {
  setReport,
  addNewReport,
  setUsers,
  setCurrentUser,
  setLoggedinUserReport
  // updateReport
} from '../../actions/admin.actions';

export function getLoggedinUserReports() {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/user/reports';
    try {
      const response: AxiosResponse = await http.get(URL);

      dispatch(setLoggedinUserReport(response.data));
    } catch (e) {
      throw e;
    }
  };
}

export function createLoggedinUserReport(data: any) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/user/reports';
    try {
      const response: AxiosResponse = await http.post(URL, data);

      // dispatch(addNewReport(data));
    } catch (e) {
      throw e;
    }
  };
}

export function uploadRecommendedProducts(data: any) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/admin/product/upload/recommended/csv';
    try {
      const response: AxiosResponse = await http.post(URL, data);

      // dispatch(addNewReport(data));
    } catch (e) {
      throw e;
    }
  };
}

export function manuallyUploadRecommendedProducts(data: any) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/admin/product/upload/recommended';
    try {
      const response: AxiosResponse = await http.post(URL, data);
    } catch (e) {
      throw e;
    }
  };
}
