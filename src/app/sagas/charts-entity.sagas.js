/* eslint-disable object-curly-newline */
import {
  put,
  call,
  select,
  take,
  fork,
  getContext,
  takeLatest,
  takeEvery,
  cancel,
  delay,
  cancelled,
  setContext,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import {
  chartsPlaysEntity,
  chartsPostsEntity,
  chartsUsersEntity,
  loadChartsUsersEntity,
  loadChartsPlaysEntity,
  loadChartsPostsEntity,
  loadChartsImpressionsEntity,
  LOAD_CHART_IMPRESSIONS,
  LOAD_CHART_USERS,
  CANCEL_CHART_IMPRESSIONS,
  CANCEL_CHART_USERS,
  CANCEL_CHART_PLAYS,
  CANCEL_CHART_POSTS,
} from '@/actions';

import {
  getChartImpression,
  getModalCurrentDateSchema,
  isRealTime,
  isWSChart,
} from '@/selectors';

import { fetchChartsUsersEntity, watchChartsUsersEntity } from '@/services';
/**
 *  Event Channels
 *
 */

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

/**
 *  Event handlers
 */

export function* cancelEventChannel(entity, channel) {
  yield take(entity);
  channel.close();
  return null;
}

export function* handleEvent(entity, payload, schema) {
  yield put(entity.request(payload));

  if (schema?.data) {
    yield put(entity.success(payload, schema?.data || {}));
  } else {
    yield put(entity.failure(payload, schema?.message || 'Unhandled Error'));
  }
}

/**
 * WebSocket interaction along with
 * query schema fetching
 */

export function* fetchChartUsers({ payload }) {
  const client = yield getContext('client');

  const channel = yield call(
    createEventChannel,
    client,
    watchChartsUsersEntity,
    payload,
  );

  const handleCancelEventChannel = cancelEventChannel.bind(
    null,
    CANCEL_CHART_USERS,
  );

  yield fork(handleCancelEventChannel, channel);

  try {
    const handleEventChannel = handleEvent.bind(
      null,
      chartsUsersEntity,
      payload,
    );
    yield takeEvery(channel, handleEventChannel);
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

/**
 * Observers for root Sagas
 */

export function* watchLoadChartUsers() {
  while (true) {
    const { payload } = yield take(LOAD_CHART_USERS);
    yield fork(fetchChartUsers, payload);
  }
}
