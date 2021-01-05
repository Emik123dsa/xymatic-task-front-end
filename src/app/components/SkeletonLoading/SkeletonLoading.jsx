import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { toNumber } from 'lodash';
import ContentLoader from 'react-content-loader';
import { fadeIn, fadeOut } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

import _ from './SkeletonLoading.scss';

const styles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '0.4s',
  },
  fadeOut: {
    animationName: fadeOut,
    animationDuration: '0.4s',
  },
});

const SKELETON_LOADING_FACTORY = () => ({
  height: 100,
});

export default class SpinLoading extends PureComponent {
  static propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = SKELETON_LOADING_FACTORY();

  skeletonLoading = null;

  constructor(props) {
    super(props);
    this.skeletonLoading = React.createRef();
  }

  render() {
    return (
      <Fragment>
        <div ref={this.skeletonLoading} className={css(styles.fadeIn)}>
          <ContentLoader
            speed={1}
            className={_.skeleton}
            width="100%"
            height={this.heightPlaceholder}
            backgroundColor="#1c2430"
            backgroundOpacity="0.2"
            foregroundColor="#1c2430"
            {...this.props}
          >
            <rect x="0" y="0" rx="20" ry="20" width="100%" height="100%" />
          </ContentLoader>
        </div>
      </Fragment>
    );
  }

  get heightPlaceholder() {
    return typeof this.props.height === 'string'
      ? toNumber(this.props.height)
      : this.props.height;
  }
}
