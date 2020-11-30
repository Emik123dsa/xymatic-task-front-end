import { take } from 'redux-saga/effects';

import * as actions from '@/actions';

export function* watchResize() {
  while (true) {
    yield take(actions.SET_IS_MOBILE);
  }
}
