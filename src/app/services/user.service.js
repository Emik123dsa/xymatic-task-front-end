/* eslint-disable arrow-body-style */
import gql from 'graphql-tag';

export const createNewUser = gql`
  mutation createNewUser($userInput: UserInput!) {
    newUser(userInput: $userInput) {
      name
      email
    }
  }
`;

export const authUser = gql`
  query signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      name
      email
      token
      roles
    }
  }
`;

export const getCurrentUser = gql`
  query getCurrentUser {
    getCurrentUser {
      name
      email
      token
      roles
    }
  }
`;
