import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { stringify } from 'querystring';

import axios from '../../utils/axios';

import { IAppplicationState } from '../../reducers';
import { loginSuccess, loginFailure } from '../../actions/auth.actions';

export function login(username: string, password: string) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = `/user/login`;
    try {
      const response: AxiosResponse = await axios.post(
        URL,
        stringify({
          username,
          password
        })
      );

      dispatch(loginSuccess(response.data));
    } catch (e) {
      loginFailure();
      throw e;
    }
  };
}
