import { fromJS } from 'immutable';
import Cookies from 'js-cookie';
import {
  FAILURE_AUTHORIZED,
  SUCCESFULLLY_AUTHORIZED,
  SUCCESSFULLY_SIGNED_UP,
} from '@/shared/helpers/messages';

import { coercedToast } from '@/shared/coercedToast';

export const initialUserReducer = fromJS({
  isAuthenticated: false,
  userCredentials: {},
});

export const userReducer = (state = initialUserReducer, action) => {
  if (action && action?.signInSuccess) {
    if (Cookies.get('Bearer')) Cookies.remove('Bearer', { path: '/' });

    const { signIn } = action?.signInSuccess;

    Cookies.set('Bearer', signIn?.token || null, { path: '/', expires: 1 });

    coercedToast.success(SUCCESFULLLY_AUTHORIZED);

    return state.withMutations((user) =>
      user
        .setIn(['isAuthenticated'], fromJS(true))
        .setIn(['userCredentials'], fromJS(signIn)),
    );
  }

  if (action && action?.getCurrentUserSuccess) {
    const { getCurrentUser } = action?.getCurrentUserSuccess;
    return state.withMutations((user) =>
      user
        .setIn(['isAuthenticated'], fromJS(true))
        .setIn(['userCredentials'], fromJS(getCurrentUser)),
    );
  }

  if (action && action?.newUserSuccess) {
    coercedToast.success(SUCCESSFULLY_SIGNED_UP);
    const { newUser } = action?.newUserSuccess;
    return state.withMutations((user) =>
      user.setIn(['userCredentials'], fromJS(newUser)),
    );
  }

  if (action && action?.error) {
    if (action?.payload) coercedToast.failure(FAILURE_AUTHORIZED);
    return state.withMutations((user) =>
      user
        .setIn(['isAuthenticated'], fromJS(false))
        .setIn(['userCredentials'], fromJS(action?.error && action?.error[0])),
    );
  }

  return state;
};
