/* 
  src/reducers/dashboard.reducer.ts
*/
import { Actions } from '../constants/actions';

export interface IDashboardReducer {
  searchResult: any;
}

const initialState: IDashboardReducer = {
  searchResult: []
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.dashboardActions.SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload
      };

    default:
      return state;
  }
};
