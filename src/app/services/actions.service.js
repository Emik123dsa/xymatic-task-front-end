import gql from 'graphql-tag';

export const fetchAllPosts = gql`
  query fetchAllPosts($page: Int!, $size: Int!, $sort: PostSort!) {
    findAllPosts(page: $page, size: $size, sort: $sort) {
      id
      title
      createdAt
      author {
        name
      }
      verbose {
        attitude
      }
      __typename
    }
  }
`;

export const fetchAllUsers = gql`
  query findAllUsers($page: Int!, $size: Int!, $sort: UserSort!) {
    findAllPosts(page: $page, size: $size, sort: $sort) {
      id
      title
      createdAt
      author {
        name
      }
      verbose {
        attitude
      }
      __typename
    }
  }
`;

export const fetchAllPlays = gql`
  query findAllPlays($page: Int!, $size: Int!, $sort: PlaySort!) {
    findAllPosts(page: $page, size: $size, sort: $sort) {
      id
      title
      createdAt
      author {
        name
      }
      verbose {
        attitude
      }
      __typename
    }
  }
`;

export const fetchAllImpressions = gql`
  query findAllImpressions($page: Int!, $size: Int!, $sort: ImpressionSort!) {
    findAllPosts(page: $page, size: $size, sort: $sort) {
      id
      title
      createdAt
      author {
        name
      }
      verbose {
        attitude
      }
      __typename
    }
  }
`;
