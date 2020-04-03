/* 
  src/reducers/overview.reducer.js
*/
import { Actions } from '../constants/actions';
import { changeVersionToCamelcase } from '../utils/string';

export interface IOverviewReducer {
  quickStat: any;
  subscribedIngredients: any;
  watchedIngredients: any;
  activeProducts: any;
  currentProduct: any;
  currentIngredient: any;
}

const initialState: IOverviewReducer = {
  quickStat: {},
  subscribedIngredients: [],
  watchedIngredients: [],
  activeProducts: [],
  currentProduct: {},
  currentIngredient: {}
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.overviewActions.SET_SUMMARY:
      return {
        ...state,
        quickStat: {
          ...action.payload
        }
      };

    case Actions.overviewActions.SET_ACTIVE_PRODUCTS:
      return {
        ...state,
        activeProducts: action.payload
      };

    case Actions.overviewActions.SET_CONCEPT_PRODUCTS:
      return {
        ...state,
        conceptProducts: action.payload
      };

    case Actions.overviewActions.SET_SUBSCRIBED_INGREDIENTS:
      return {
        ...state,
        subscribedIngredients: action.payload
      };

    case Actions.overviewActions.SET_WATCHED_INGREDIENTS:
      return {
        ...state,
        watchedIngredients: [...action.payload]
      };

    case Actions.overviewActions.SET_CURRENT_PRODUCT:
      const productDetail = action.payload.products;
      const activeVersion = `v${changeVersionToCamelcase(productDetail.version)}`;
      const loadedProduct = productDetail[activeVersion];

      return {
        ...state,
        currentProduct: {
          id: action.payload.id,
          // camelcaseVersion: activeVersion,
          product_name: action.payload.product_name,
          version: action.payload.version,
          history: action.payload.history,
          ...loadedProduct,
          ...action.payload
        }
      };

    case Actions.overviewActions.SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload
      };

    case Actions.overviewActions.CHANGE_VERSION:
      const version = `v${changeVersionToCamelcase(action.payload)}`;
      const product = state.currentProduct.products[version];

      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          ...product
        }
      };

    default:
      return state;
  }
};
