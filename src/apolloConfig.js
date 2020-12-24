/* eslint-disable new-cap */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { coercedToken } from '~/app/shared/coercedToken';
import { Config } from './config';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => ({
  headers: coercedToken(headers),
}));

const wsLink = new WebSocketLink({
  uri: Config.GRAPHQL_WS,
  options: {
    lazy: true,
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
  authLink.concat(httpLink),
  errorLink,
);

export const client = () =>
  new ApolloClient({
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
