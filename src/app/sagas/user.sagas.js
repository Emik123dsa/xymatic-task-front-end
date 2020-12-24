import {
  take,
  delay,
  fork,
  select,
  call,
  put,
  getContext,
} from 'redux-saga/effects';
import * as actions from '@/actions';
import * as service from '@/services';

import { getUserAuthenticated, getUserCredentials } from '../selectors';

export function* fetchResponseEntity(entity, query, variables) {
  if (variables) yield put(actions.resetErrorMessage());

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
    if (variables) yield put(actions.setErrorMessage(response?.errors));
    yield put(entity.failure(variables, response?.errors || []));
  }
}

export const fetchUserAuth = fetchResponseEntity.bind(
  null,
  actions.authUser,
  service.authUser,
);

export const fetchNewUser = fetchResponseEntity.bind(
  null,
  actions.createNewUser,
  service.createNewUser,
);

export const fetchCurrentUser = fetchResponseEntity.bind(
  null,
  actions.getCurrentUser,
  service.getCurrentUser,
);

export function* loadUserAuth(payload) {
  const isAuthenticated = yield select(getUserAuthenticated);

  if (!isAuthenticated) {
    yield call(fetchUserAuth, payload);
  }
}

export function* loadNewUser(payload) {
  const isAuthenticated = yield select(getUserAuthenticated);

  if (!isAuthenticated) {
    yield call(fetchNewUser, payload);
    const userCredentials = yield select(getUserCredentials);
    if (userCredentials.has('email')) {
      yield delay(200);
      const { userInput } = payload;
      yield call(fetchUserAuth, {
        email: userCredentials.get('email'),
        password: userInput?.password,
      });
    }
  }
}

export function* loadCurrentUser() {
  const userCredentials = yield select(getUserCredentials);

  if (!userCredentials.has('token')) {
    yield call(fetchCurrentUser);
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
    const { userInput } = yield take(actions.LOAD_NEW_USER);

    yield fork(loadNewUser, { userInput });
  }
}

export function* watchCurrentUser() {
  while (true) {
    yield take(actions.LOAD_CURRENT_USER);

    yield fork(loadCurrentUser);
  }
}
