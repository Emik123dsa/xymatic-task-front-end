import { take } from 'redux-saga/effects';

import * as actions from '@/actions';

export function* watchUserAuth() {
  while (true) {
    const { email, password } = yield take(actions.LOAD_AUTH_USER);
  }
}

export function* watchNewUser() {
  while (true) {
    const { name, email, password } = yield take(actions.LOAD_NEW_USER);
  }
}
