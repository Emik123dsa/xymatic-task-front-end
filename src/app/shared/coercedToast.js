import { toast } from 'react-toastify';
import _ from '@/components/Toastify/Toastify.scss';
import { css, StyleSheet } from 'aphrodite';

const options = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const styles = StyleSheet.create({
  success: {
    backgroundColor: '#602dd3',
    boxShadow: '0 0 0.1rem #602dd3',
  },
  failure: {
    boxShadow: '0 0 0.1rem  #ef263d',
    backgroundColor: ' #ef263d',
  },
});

export const coercedToast = {
  success: (title) =>
    toast.success(title, {
      ...options,
      className: [_['toastify-container'], _['toastify-container-success']]
        .filter((e) => !!e)
        .join(' '),
      progressClassName: css(styles.success),
    }),
  failure: (title) =>
    toast.dark(title, {
      ...options,
      className: [_['toastify-container'], _['toastify-container-failure']]
        .filter((e) => !!e)
        .join(' '),
      progressClassName: css(styles.failure),
    }),
};
