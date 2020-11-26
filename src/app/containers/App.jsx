import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getRouterLocation } from '@/selectors';

class App extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };

  render() {
    const { route } = this.props;
    return <div>App</div>;
  }
}

export default App;
