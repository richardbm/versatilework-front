import {
    CHANGE_MAIN_TAB,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case CHANGE_MAIN_TAB:
            return {
                ...state,
                tab: action.tab,
            };
        default:
            return {
                ...state,
                tab: 0,
            };
    }
};