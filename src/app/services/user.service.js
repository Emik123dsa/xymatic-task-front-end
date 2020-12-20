/* eslint-disable arrow-body-style */
import gql from 'graphql-tag';

export const createNewUser = gql`
  mutation createNewUser($userInput: UserInput!) {
    newUser(userInput: $userInput) {
      email
      name
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
