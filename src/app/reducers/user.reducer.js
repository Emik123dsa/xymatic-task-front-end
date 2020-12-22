import { fromJS } from 'immutable';
import {
  FAILURE_AUTHORIZED,
  SUCCESFULLLY_AUTHORIZED,
} from '@/shared/helpers/messages';

import { coercedToast } from '@/shared/coercedToast';

export const initialUserReducer = fromJS({
  isAuthenticated: false,
  userCredentials: {},
});

export const userReducer = (state = initialUserReducer, action) => {
  if (action && action?.response) {
    coercedToast.success(SUCCESFULLLY_AUTHORIZED);
  }

  if (action && action?.error) {
    coercedToast.failure(FAILURE_AUTHORIZED);
    return state.setIn(['isAuthenticated'], false);
  }

  return state;
};
