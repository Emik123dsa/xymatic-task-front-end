import { isImmutable } from 'immutable';
import {
  fadeInDown,
  slideInLeft,
  shake,
  fadeIn,
  slideInRight,
} from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

export const styles = StyleSheet.create({
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: '1.6s',
  },
  slideInLeft: {
    animationName: slideInLeft,
    animationDirection: 'alternate',
    animationDuration: '1.6s',
  },
  slideInRight: {
    animationName: slideInRight,
    animationDirection: 'alternate',
    animationDuration: '1.6s',
  },
  shake: {
    animationName: shake,
    animationDuration: '0.4s',
  },
});

export const coercedStyles = (errors) => {
  const _css = [];

  _css.push(css(styles.fadeInDown));

  if ((isImmutable(errors) ? errors.size : errors.length) > 0) {
    _css.push(css(styles.shake));
  }

  return _css.filter((e) => !!e).join(' ');
};
