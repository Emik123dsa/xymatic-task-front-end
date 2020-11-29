import React from 'react';
import {
  InMemoryCache,
  HttpLink,
  ApolloClient,
  ApolloProvider,
} from '@apollo/client';
import { Config } from './config';

const httpLink = {
  uri: Config.GRAPHQL_API_ROOT,
  // headers: {
  //   authorization: `Bearer ${token}`,
  // },
};

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloSchemaProvider = (App) => (
  <ApolloProvider client={client}>{App}</ApolloProvider>
);
