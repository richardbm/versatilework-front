import {
    AUTH_SET_TOKEN,
    AUTH_DISCARD_TOKEN,
    AUTH_SET_USER,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case AUTH_DISCARD_TOKEN:
            return {};
        case AUTH_SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};