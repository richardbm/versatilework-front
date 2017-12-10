import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import commons from './reducers/common';
import explorer from './reducers/explorer';

export default combineReducers({
    commons,
    explorer,
    router: routerReducer
});
