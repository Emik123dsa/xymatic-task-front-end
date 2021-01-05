/* eslint-disable space-before-function-paren, func-names */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import { connect as Connect } from 'react-redux';
import loadable from '@loadable/component';
import LazyLoading from '@/components/LazyLoading/LazyLoading';
import {
  getRouterLocation,
  getUserAuthenticated,
  getUserCredentials,
} from '@/selectors';
import { setLoadCurrentUser } from '@/actions';
import { isTokenExists } from '@/shared/coercedToken';
import { Config } from '~/config';

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
  {
    setLoadCurrentUser,
  },
)
class ProtectedRoute extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userCredentials: PropTypes.any.isRequired,
    setLoadCurrentUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    if (isTokenExists()) this.props.setLoadCurrentUser();
    this.state = { isUserFetched: false };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isAuthenticated } = this.props;

    if (
      nextProps.isAuthenticated === isAuthenticated ||
      nextProps.isAuthenticated !== isAuthenticated
    ) {
      return true;
    }

    return true;
  }

  _redirect() {
    const { route } = this.props;
    return (
      <Redirect
        to={{
          pathname: route?.redirect,
          state: { from: this.props.location.toJS() },
        }}
      />
    );
  }

  _renderUserPrincipal() {
    const { route } = this.props;

    if (route?.isPublic) {
      if (this._isUserAuthenticated) return this._redirect();
      return <AsyncContainer name={route.key} {...this.props} />;
    }

    if (this._isUserAuthenticated) {
      return <AsyncContainer name={route.key} {...this.props} />;
    }

    return null;
  }

  get _isUserAuthenticated() {
    const { isAuthenticated, userCredentials } = this.props;
    return isAuthenticated && userCredentials.has('token');
  }

  componentDidMount() {
    this.setState((prevState) => ({
      isUserFetched: true,
    }));
  }

  render() {
    const { route } = this.props;

    if (isTokenExists()) {
      if (!this.state.isUserFetched) return <LazyLoading />;
      return this._renderUserPrincipal();
    }

    if (route?.isPublic) {
      return <AsyncContainer name={route.key} {...this.props} />;
    }

    return this._redirect();
  }
}

export default ProtectedRoute;
