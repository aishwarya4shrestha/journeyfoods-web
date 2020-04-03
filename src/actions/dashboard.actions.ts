import { Actions } from '../constants/actions';

export const setSearchResult = (payload: any) => ({
  type: Actions.dashboardActions.SET_SEARCH_RESULT,
  payload
});
