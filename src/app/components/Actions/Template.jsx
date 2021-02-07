import React from 'react';
import PropTypes from 'prop-types';
import schema from '@styles/_schema.scss';
import { css } from 'aphrodite';
import { classnames } from '@/shared/coerced.classnames';
import { styles } from '@/shared/coerced.styles';
import _ from './Actions.scss';

const ActionTemplate = (props) => {
  const animatedDirection = () =>
    classnames(
      _['actions-wrapper'],
      schema['pt-2'],
      'appear',
      css(
        props && props.direction.startsWith('left')
          ? styles.slideInLeft
          : styles.slideInRight,
      ),
    );

  return (
    <div className={_.actions}>
      <div className={animatedDirection()}>
        {React.Children.map(props.children, (mutableChild) => {
          if (!mutableChild) return null;
          return React.cloneElement(mutableChild);
        })}
      </div>
    </div>
  );
};

ActionTemplate.propTypes = {
  children: PropTypes.array,
  direction: PropTypes.string,
  redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
};

export default ActionTemplate;
