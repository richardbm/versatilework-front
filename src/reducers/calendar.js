import {
    EXPLORE_PAGE_LOADED,
    EXPLORE_PAGE_UNLOAD,
    APPLY_FILTER_EXPLORE,
} from '../constants/actionTypes';
import { SUPPLY, DEMAND, ALL } from '../constants/constExplorer'

export default (state = {}, action) => {
    switch (action.type) {
        case EXPLORE_PAGE_LOADED:
            return {
                ...state,
                tab: action.tab,
            };
        case EXPLORE_PAGE_UNLOAD:
            return {
                tab: action.tab,
            };
        case APPLY_FILTER_EXPLORE:
            return {
                ...state,
                tab: action.tab,
            };
        default:
            return {
                ...state,
                tab: action.tab,
            };
    }
};