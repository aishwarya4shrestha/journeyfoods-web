import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import * as tokenService from '../../service/token.service';

import http from '../../utils/axios';
import { IAppplicationState } from '../../reducers';
import {
  setSummary,
  setSubscribedIngredients,
  setWatchedIngredients,
  setActiveProducts,
  setCurrentProduct,
  setCurrentIngredient
} from '../../actions/overview.actions';

export function getQuickStat() {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/quickStats';
    let accessToken = tokenService.getAccessToken();
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: accessToken
    //   }
    // };

    try {
      const response: AxiosResponse = await http.get(URL);

      dispatch(setSummary(response.data));
    } catch (e) {
      throw e;
    }
  };
}

export function getActiveProducts() {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/user/product';
    // const URL = '/new_products';

    try {
      const response: AxiosResponse = await http.get(URL);

      dispatch(setActiveProducts(response.data.products)); //TODO: /products
    } catch (e) {
      throw e;
    }
  };
}

export function getConceptProducts() {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/user/product';
    // const URL = '/new_products';

    try {
      const response: AxiosResponse = await http.get(URL);

      dispatch(setActiveProducts(response.data)); //TODO: /products
    } catch (e) {
      throw e;
    }
  };
}

export function getSubscribedIngredients() {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/user/ingredient/subscribed';
    try {
      const response: AxiosResponse = await http.get(URL);

      dispatch(setSubscribedIngredients(response.data));
    } catch (e) {
      throw e;
    }
  };
}

export function getWatchedIngredients() {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = `/user/ingredient/watched`;
    try {
      const response: AxiosResponse = await http.get(URL);

      dispatch(setWatchedIngredients(response.data));
    } catch (e) {
      throw e;
    }
  };
}

export function moveToWatchList(data: any) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = '/user/ingredient/watched';
    try {
      const response: AxiosResponse = await http.post(URL, data);

      dispatch(setSubscribedIngredients(response.data));
    } catch (e) {
      throw e;
    }
  };
}

export function getProduct(id: string) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = `/user/product/${id}`;
    try {
      const response: AxiosResponse = await http.get(URL);

      dispatch(setCurrentProduct(response.data));
    } catch (e) {
      throw e;
    }
  };
}

// export function getIngredient(id: string) {
//   console.log('helllllo');
//   return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
//     const URL = `master/ingredient/${id}`;
//     try {
//       const response: AxiosResponse = await http.get(URL);

//       dispatch(setCurrentIngredient(response.data));
//     } catch (e) {
//       throw e;
//     }
//   };
// }

export function getIngredient(id: string) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = `ingredient/details/${id}`;
    // const URL = '/new_products';

    try {
      const response: AxiosResponse = await http.get(URL);

      dispatch(setCurrentIngredient(response.data));
    } catch (e) {
      throw e;
    }
  };
}

export function changeOptimization(id: string, optimizationType: string, status: string) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = `/user/product/${id}`;
    const data = new FormData();

    if (status == 'High') {
      status = 'Medium';
    } else if (status == 'Medium') {
      status = 'Low';
    } else if (status == 'Low') {
      status = 'Default';
    } else {
      status = 'High';
    }
    data.append(optimizationType, status);

    try {
      await http.put(URL, data);
    } catch (e) {
      throw e;
    }
  };
}

export function editProductInformation(id: string, data: any) {
  return async (dispatch: Dispatch<any>, getState: () => IAppplicationState) => {
    const URL = `/user/product/${id}`;

    try {
      await http.put(URL, data);
    } catch (e) {
      throw e;
    }
  };
}
