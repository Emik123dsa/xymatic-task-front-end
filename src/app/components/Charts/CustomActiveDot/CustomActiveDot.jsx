/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import _ from './CustomActiveDot.scss';

export const CustomActiveDot = ({ cx, cy, fill }) => {
  const x = Math.round(cx);
  const y = Math.round(cy);

  return (
    <svg className={_['custom-active-dot']}>
      <circle
        className={_['custom-active-dot_hover']}
        cx={x}
        cy={y}
        stroke={fill}
        r="16"
      />
      <circle
        className={_['custom-active-dot_circle']}
        cx={x}
        cy={y}
        stroke={fill}
        r="6"
      />
    </svg>
  );
};

CustomActiveDot.propTypes = {
  index: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number,
  fill: PropTypes.string,
};
