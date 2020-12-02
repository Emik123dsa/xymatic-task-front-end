/* eslint-disable object-curly-newline */
import {
  put,
  call,
  select,
  take,
  fork,
  getContext,
  takeEvery,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

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
} from '@/actions';

import { getChartImpression } from '@/selectors';

import {
  fetchChartsImpressionsEntity,
  fetchChartsPlaysEntity,
  fetchChartsPostsEntity,
  fetchChartsUsersEntity,
} from '@/services';

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
          emitter(err);
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

function* loadChartImpressions(payload = {}) {
  const client = yield getContext('client');

  const channel = yield call(
    createEventChannel,
    client,
    fetchChartsImpressionsEntity,
    payload,
  );

  const handleChartImpressions = handleEvent.bind(
    null,
    chartsImmersionsEntity,
    payload,
  );

  yield takeEvery(channel, handleChartImpressions);
}

export function* watchLoadChartImpressions() {
  while (true) {
    const { payload } = yield take(LOAD_CHART_IMPRESSIONS);
    yield fork(loadChartImpressions, payload);
  }
}
