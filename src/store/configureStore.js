// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./configureStore.prod')
// } else {
//   module.exports = require('./configureStore.dev')
// }

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from '../reducer';

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

let history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(myRouterMiddleware, createLogger())
    }
};

const store = createStore(
    reducer, composeWithDevTools(getMiddleware())
);

export default store;