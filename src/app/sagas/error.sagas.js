import { take } from 'redux-saga/effects';

import * as actions from '@/actions';

export function* watchErrors() {
  while (true) {
    yield take(actions.RESET_ERROR_MESSAGE);
  }
}
