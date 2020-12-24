import { isImmutable } from 'immutable';
import { fadeInDown, shake } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

export const styles = StyleSheet.create({
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: '0.4s',
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
