/* eslint-disable object-curly-newline */
import {
  put,
  call,
  select,
  take,
  fork,
  getContext,
  takeEvery,
  cancel,
  delay,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import {
  chartsImmersionsEntity,
  chartsPlaysEntity,
  chartsPostsEntity,
  chartsUsersEntity,
  loadChartsUsersEntity,
  loadChartsPlaysEntity,
  loadChartsPostsEntity,
  loadChartsImpressionsEntity,
  LOAD_CHART_IMPRESSIONS,
  LOAD_CHART_USERS,
} from '@/actions';

import { getChartImpression } from '@/selectors';

import { fetchChartsUsersEntity, watchChartsUsersEntity } from '@/services';

const createEventChannel = (client, query, params = {}) =>
  eventChannel((emitter) => {
    const Subscription = client
      .subscribe({
        query,
        fetchPolicy: 'no-cache',
        variables: params,
      })
      .subscribe({
        next(data) {
          emitter(data);
        },
        complete() {},
        error(err) {
          emitter(END);
        },
      });

    return () => {
      Subscription.unsubscribe();
    };
  });

export function* handleEvent(entity, payload, schema) {
  yield put(entity.request(payload));

  if (schema?.data) {
    yield put(entity.success(payload, schema?.data || {}));
  } else {
    yield put(entity.failure(payload, schema?.message || 'Unhandled Error'));
  }
}

function* loadChartUsers(payload = {}) {
  const client = yield getContext('client');

  const channel = yield call(
    createEventChannel,
    client,
    watchChartsUsersEntity,
    payload,
  );

  const handleChartUsers = handleEvent.bind(null, chartsUsersEntity, payload);

  yield takeEvery(channel, handleChartUsers);
}

export function* watchLoadChartUsers() {
  while (true) {
    const { payload } = yield take(LOAD_CHART_USERS);
    yield fork(loadChartUsers, payload);
  }
}
