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
      count
      __typename
    }
  }
`;
