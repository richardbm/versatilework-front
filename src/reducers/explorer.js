import {
    EXPLORE_PAGE_LOADED,
    EXPLORE_PAGE_UNLOAD,
    APPLY_FILTER_EXPLORE,
} from '../constants/actionTypes';
import { OFFER, DEMAND, ALL } from '../constants/constExplorer'

const filterActivity = (state = {}, filter=ALL) => {
  switch (filter) {
      case DEMAND:
          return state.filter( obj => obj.type === DEMAND);
      case OFFER:
          return state.filter( obj => obj.type === OFFER);
      case ALL:
          return state;
      default:
          return state;
  }
};

export default (state = {}, action) => {
    switch (action.type) {
        case EXPLORE_PAGE_LOADED:
            return {
                ...state,
                activity: action.activity,
                tab: action.tab,
            };
        case EXPLORE_PAGE_UNLOAD:
            return {
                tab: action.tab,
                activity: [],
            };
        case APPLY_FILTER_EXPLORE:
            return {
                ...state,
                tab: action.tab,
                activity: filterActivity(action.activity, action.tab),
            };
        default:
            return {
                ...state,
                tab: action.tab,
                activity: [],
            };
    }
};