import { Actions } from '../constants/actions';

export const setSummary = (payload: any) => ({
  type: Actions.overviewActions.SET_SUMMARY,
  payload
});

export const setActiveProducts = (payload: any) => ({
  type: Actions.overviewActions.SET_ACTIVE_PRODUCTS,
  payload
});

export const setConceptProducts = (payload: any) => ({
  type: Actions.overviewActions.SET_CONCEPT_PRODUCTS,
  payload
});

export const setSubscribedIngredients = (payload: any) => ({
  type: Actions.overviewActions.SET_SUBSCRIBED_INGREDIENTS,
  payload
});

export const setWatchedIngredients = (payload: any) => ({
  type: Actions.overviewActions.SET_WATCHED_INGREDIENTS,
  payload
});

export const setCurrentProduct = (payload: any) => ({
  type: Actions.overviewActions.SET_CURRENT_PRODUCT,
  payload
});

export const changeVersion = (payload: any) => ({
  type: Actions.overviewActions.CHANGE_VERSION,
  payload
});

export const setCurrentIngredient = (payload: any) => ({
  type: Actions.overviewActions.SET_CURRENT_INGREDIENT,
  payload
});
