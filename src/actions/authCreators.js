import  { AUTH_SET_USER,
        AUTH_DISCARD_TOKEN,
        AUTH_SET_TOKEN } from '../constants/actionTypes';

function authSetToken(token) {
    return {
        type: AUTH_SET_TOKEN,
        token
    }

}

function authDiscardToken(token) {
    localStorage.removeItem('token');
    
    return {
        type: AUTH_DISCARD_TOKEN,
    }

}

function authSetUser(user) {
    return {
        type: AUTH_SET_USER,
        user
    }

}

export default authDiscardToken;
export default authSetToken;
export default authSetUser;