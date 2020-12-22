import {
  take,
  delay,
  fork,
  select,
  call,
  put,
  getContext,
} from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import * as actions from '@/actions';
import * as service from '@/services';

import { getUserAuthenticated, getUserCredentials } from '../selectors';

export function* fetchResponseEntity(entity, query, variables) {
  yield put(actions.resetErrorMessage());
  yield put(entity.request(variables));

  const client = yield getContext('client');

  const response = yield call(client.query, {
    query,
    fetchPolicy: 'no-cache',
    variables,
    errorPolicy: 'all',
  });

  if (response?.data) {
    yield put(entity.success(variables, response?.data));
  } else {
    yield put(actions.setErrorMessage(response?.errors));
    yield put(entity.failure(variables, response?.errors || []));
  }
}

export const fetchUserAuth = fetchResponseEntity.bind(
  null,
  actions.authUser,
  service.authUser,
);

export function* loadUserAuth(payload) {
  const isAuthenticated = yield select(getUserAuthenticated);
  const userCredentials = yield select(getUserCredentials);
  if (!(userCredentials.has('token') && isAuthenticated)) {
    yield call(fetchUserAuth, payload);
  }
}

export function* watchUserAuth() {
  while (true) {
    const { email, password } = yield take(actions.LOAD_AUTH_USER);
    yield fork(loadUserAuth, { email, password });
  }
}

export function* watchNewUser() {
  while (true) {
    const { name, email, password } = yield take(actions.LOAD_NEW_USER);
  }
}
