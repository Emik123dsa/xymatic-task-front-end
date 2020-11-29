import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getRouterLocation } from '@/selectors';
import { fromEvent, Subscription } from 'rxjs';
import { setIsMobile } from '../actions';

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
        fromEvent(window, 'resize')
          .pipe()
          .subscribe(({ target }) => {
            this.props.setIsMobile({
              payload: target.innerWidth < DEFAULT_MOBILE_WIDTH,
            });
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
      <div className="root">
        {this._renderSiteMeta()}
        <div className="main">{renderRoutes(route.childRoutes)}</div>
      </div>
    );
  }
}

export default Root;
