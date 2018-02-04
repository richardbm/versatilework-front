import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import commons from './reducers/common';
import explorer from './reducers/explorer';
import auth from './reducers/auth';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    commons,
    explorer,
    calendar: explorer,
    router: routerReducer,
    form: formReducer

});
