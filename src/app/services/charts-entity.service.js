/* eslint-disable arrow-body-style */
import gql from 'graphql-tag';
import { callGraphQLApi } from './graphql';

// const currencySchema = new schema.Entity('currency');

// const ratesSchema = new schema.Entity('rates', {
//   currency: currencySchema,
// });

// const impressionsSchemaArray = new schema.Array(
//   {
//     data: ratesSchema,
//   },
//   (entity) => entity.rates,
// );

export const fetchChartsUsersEntity = (payload) =>
  callGraphQLApi('/', {
    query: `query GetRates {
    rates(currency: "USD") {
      currency
    }
  }`,
  });

export const fetchChartsImpressionsEntity = gql`
  subscription {
    usersSubscribe {
      id
    }
  }
`;

export const fetchChartsPlaysEntity = (payload) =>
  callGraphQLApi('/', {
    query: `query GetRates {
    rates(currency: "USD") {
      currency
    }
  }`,
  });

export const fetchChartsPostsEntity = (payload) =>
  callGraphQLApi('/', {
    query: `query GetRates {
    rates(currency: "USD") {
      currency
    }
  }`,
  });
