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

export const watchChartsPostsEntity = gql`
  subscription postSubscribe {
    postSubscribe {
      delta
      timestamp
      __typename
    }
  }
`;

export const watchChartsPlaysEntity = gql`
  subscription playsSubscribe {
    playsSubscribe {
      delta
      timestamp
      __typename
    }
  }
`;

export const watchChartsImpressionsEntity = gql`
  subscription impressionsSubscribe {
    impressionsSubscribe {
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

export const fetchChartsPostsEntity = gql`
  query postChart($period: Period) {
    findPostByChart(period: $period) {
      delta
      deltaTotal
      timestamp
      __typename
    }
  }
`;

export const fetchChartsImpressionsEntity = gql`
  query findImpressionsByChart($period: Period) {
    findImpressionsByChart(period: $period) {
      delta
      deltaTotal
      timestamp
      __typename
    }
  }
`;

export const fetchChartsPlayEntity = gql`
  query findPlayByChart($period: Period) {
    findPlayByChart(period: $period) {
      delta
      deltaTotal
      timestamp
      __typename
    }
  }
`;

export const fetchRowsCount = gql`
  query {
    countAllRows {
      type
      count
      __typename
    }
  }
`;
