import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto/files/roboto-latin-100.woff';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import { Provider } from 'react-redux';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import store from './store/configureStore';

const theme = createMuiTheme({
    palette: {
        primary: teal, // Purple and green play nicely together.

    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <Route path="/" name="Home" component={App} />
            </Router>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));
//registerServiceWorker();
