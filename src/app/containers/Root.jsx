/* eslint-disable object-curly-newline */
import React, { Component, Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getRouterLocation } from '@/selectors';
import { fromEvent, Subscription, iif, EMPTY, of, merge } from 'rxjs';
import { switchMap, distinctUntilChanged, pluck } from 'rxjs/operators';
import schema from '@styles/_schema.scss';
import { setIsMobile } from '@/actions';
import Toastify from '@/components/Toastify/Toastify';

const DEFAULT_MOBILE_WIDTH = 992;

/**
 * Decorators instead of mapStateToProps | mapDispatchToProps
 */
@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  {
    setIsMobile,
  },
)
class Root extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    setIsMobile: PropTypes.func,
  };

  _title = 'Xymatic';

  _windowResize = new Subscription();

  componentDidMount() {
    setTimeout(() => {
      this._windowResize.add(
        merge(
          fromEvent(window, 'resize'),
          fromEvent(window, 'DOMContentLoaded'),
        )
          .pipe(
            pluck('target'),
            switchMap(({ innerWidth }) =>
              of(innerWidth < DEFAULT_MOBILE_WIDTH),
            ),
            distinctUntilChanged(),
          )
          .subscribe((payload) => {
            this.props.setIsMobile({ payload });
          }),
      );
    }, 0);
  }

  componentWillUnmount() {
    if (this._windowResize) {
      this._windowResize.unsubscribe();
    }
  }

  _renderSiteMeta() {
    const canonical = this.props.location.toJS().pathname.toLowerCase();

    return (
      <Helmet
        link={[
          {
            href: canonical,
            rel: 'canonical',
          },
        ]}
        title={this._title}
      />
    );
  }

  render() {
    const { route } = this.props;
    return (
      <Fragment>
        {this._renderSiteMeta()}
        <div className={schema['bg-dark']}> </div>
        <div className="main">{renderRoutes(route.childRoutes)}</div>
        <Toastify />
      </Fragment>
    );
  }
}

export default Root;
