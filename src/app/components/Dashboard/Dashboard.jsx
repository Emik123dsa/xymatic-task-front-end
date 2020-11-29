import React, { Component } from 'react';
import { gql } from '@apollo/client';

const repoQuery = gql`
  query($name: String!) {
    search(query: $name, last: 10, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
          }
        }
      }
    }
  }
`;

class Dashboard extends Component {
  render() {
    return <div>123</div>;
  }
}

export default Dashboard;
