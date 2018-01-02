import ApolloClient from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import mockNetworkInterface from './mock';

let client = new ApolloClient({
    networkInterface: mockNetworkInterface,
    link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
    cache: new InMemoryCache(),
});

module.export = client;