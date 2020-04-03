import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import http from '../../utils/axios';
import { IAppplicationState } from '../../reducers';
import { setSearchResult } from '../../actions/dashboard.actions';
import { setCurrentIngredient } from '../../actions/overview.actions';

export function getSearchResult(searchString: string) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = `/ingredient/search?name=${searchString}`;
    try {
      const response: AxiosResponse = await http.get(URL);
      console.log('response?>>>', response);
      debugger;
      dispatch(setSearchResult(response.data));
    } catch (e) {
      throw e;
    }
  };
}

// export function getIngredient(id: string) {
//   return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
//     const URL = `master/ingredient/5cc18a812a5378074078e5c7`;
//     console.log('URL', URL);
//     try {
//       const response: AxiosResponse = await http.get(URL);

//       console.log('response', response);
//       dispatch(setCurrentIngredient(response.data));
//     } catch (e) {
//       console.log('e', e);
//       throw e;
//     }
//   };
// }
