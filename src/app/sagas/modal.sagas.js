import { take } from 'redux-saga/effects';

import * as actions from '@/actions';

export function* watchModal() {
  while (true) {
    yield take(actions.SET_MODAL_IS_OPENED);
  }
}
