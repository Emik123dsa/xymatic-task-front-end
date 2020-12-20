/* eslint-disable arrow-body-style */
import gql from 'graphql-tag';

export const watchChartsUsersEntity = gql`
  subscription usersSubscribe {
    userSubscribe {
      delta
      timestamp
      __typename
    }
  }
`;

export const fetchChartsUsersEntity = gql`
  query userChart($period: Period) {
    findUserByChart(period: $period) {
      delta
      deltaTotal
      timestamp
      __typename
    }
  }
`;

// export const fetchChartsPlaysEntity = (payload) =>
//   callGraphQLApi('/', {
//     query: `query GetRates {
//     rates(currency: "USD") {
//       currency
//     }
//   }`,
//   });

// export const fetchChartsPostsEntity = (payload) =>
//   callGraphQLApi('/', {
//     query: `query GetRates {
//     rates(currency: "USD") {
//       currency
//     }
//   }`,
//   });
