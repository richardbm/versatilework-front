import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto/files/roboto-latin-100.woff';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import { Provider } from 'react-redux';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import store from './store/configureStore';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import typeDefs from './graphql/schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });


const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Token ${token}` : "",
        }
    }
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    //networkInterface: mockNetworkInterface,
});
const theme = createMuiTheme({
    palette: {
        primary: teal, // Purple and green play nicely together.

    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Router>
                    <Route path="/" name="Home" component={App} />
                </Router>
            </ApolloProvider>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));
//registerServiceWorker();
