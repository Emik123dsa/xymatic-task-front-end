import React, { Component, Fragment } from 'react';

import { fadeIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import _ from './LazyLoading.scss';

const styles = StyleSheet.create({
  slideInUp: {
    animationName: fadeIn,
    animationDuration: '1.6s',
  },
});

const LazyLoading = () => (
  <Fragment>
    <div className={css(styles.slideInUp)}>
      <div className={_['lazy-loading']}>
        <div className={_['lazy-loading_container']}>
          <div className={_['lazy-loading_item']}>
            <span className={_['lazy-loading_item-logo']}></span>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default LazyLoading;
