import React from 'react';
import PropTypes from 'prop-types';
import _ from './Dots.scss';

export const Dots = ({ color }) => (
  <div className={_.dots}>
    <span className={_['dots-wrapper']}> </span>
  </div>
);

Dots.propTypes = {
  color: PropTypes.string,
};
