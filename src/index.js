import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto/files/roboto-latin-100.woff';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom'

const theme = createMuiTheme({
    palette: {
        primary: teal, // Purple and green play nicely together.

    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router>
            <Route path="/" name="Home" component={App} />
        </Router>
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
