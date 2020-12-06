import React, { Component, Fragment } from 'react';
import { Transition } from 'react-transition-group';

import _ from './LazyLoading.scss';

const LazyLoading = () => (
  <Fragment>
    <Transition timeout={300}>
      <div className={_['lazy-loading']}>
        <div className={_['lazy-loading_container']}>
          <div
            className={[_['lazy-loading_item'], _['lazy-loading_item-first']]
              .filter((e) => !!e)
              .join(' ')}
          ></div>
          <div
            className={[_['lazy-loading_item'], _['lazy-loading_item-second']]
              .filter((e) => !!e)
              .join(' ')}
          ></div>
          <div
            className={[_['lazy-loading_item'], _['lazy-loading_item-third']]
              .filter((e) => !!e)
              .join(' ')}
          ></div>
          <div
            className={[_['lazy-loading_item'], _['lazy-loading_item-fourth']]
              .filter((e) => !!e)
              .join(' ')}
          ></div>
        </div>
      </div>
    </Transition>
  </Fragment>
);

export default LazyLoading;
