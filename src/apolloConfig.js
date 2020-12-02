import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { Config } from './config';

const errorLink = onError(({ graphQlErrors, networkError }) => {
  if (graphQlErrors) {
    graphQlErrors.forEach(({ message, locations, path }) => {
      console.log(message);
    });
  }
  if (networkError) console.log(networkError);
});

const wsLink = new WebSocketLink({
  uri: Config.GRAPHQL_WS,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: Config.GRAPHQL_API_ROOT,
  credentials: 'same-origin',
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});
