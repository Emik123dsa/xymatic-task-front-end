import { take } from 'redux-saga/effects';

import * as actions from '@/actions';

// export function* resize() {}

export function* watchResize() {
  while (true) {
    const { payload } = yield take(actions.SET_IS_MOBILE);
    console.log(payload);
  }
}
