import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import { connect as Connect } from 'react-redux';
import loadable from '@loadable/component';
import LazyLoading from '@/components/LazyLoading/LazyLoading';
import { isEmpty } from 'lodash';
import {
  getRouterLocation,
  getUserAuthenticated,
  getUserCredentials,
} from '../selectors';

const AsyncContainer = loadable(
  (props) => import(`@/containers/${props.name}`),
  {
    fallback: <LazyLoading />,
  },
);

@withRouter
@Connect(
  (state) => ({
    location: getRouterLocation(state),
    isAuthenticated: getUserAuthenticated(state),
    userCredentials: getUserCredentials(state),
  }),
  null,
)
class ProtectedRoute extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userCredentials: PropTypes.any.isRequired,
  };

  render() {
    const { route } = this.props;

    if (this.props.isAuthenticated && !isEmpty(this.props.userCredentials)) {
      return <AsyncContainer name={route.key} {...this.props} />;
    }
    return (
      <Redirect
        to={{
          pathname: route.redirect,
          state: { from: this.props.location.toJS() },
        }}
      />
    );
  }
}

export default ProtectedRoute;
