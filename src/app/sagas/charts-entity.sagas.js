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
  cancelled,
  spawn,
  all,
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
  USERS,
  CLEAN_CHART_USERS,
} from '@/actions';

import {
  getChartImpression,
  getModalCurrentDateSchema,
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
export function* cancelEventChannel(_, event, entity, channel) {
  yield take(_);
  yield put(entity.cancel());
  channel.close();
  return null;
}

export function* cleanEventChannel(_, event, entity) {
  yield take(_);
  yield put(entity.clean());
  return null;
}

export function* handleEvent(entity, payload, schema) {
  yield put(entity.request(payload));

  if (schema?.data) {
    yield put(entity.success(payload, schema?.data || {}));
  } else {
    yield put(entity.failure(payload, schema?.message || 'UNHANDLED ERROR'));
  }
}

/**
 * WebSocket interaction along with
 * query schema fetching
 */
export function* watchChartUsers({ payload }) {
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
    USERS,
    chartsUsersEntity,
  );

  const handleCleanEventChannel = cancelEventChannel.bind(
    null,
    CLEAN_CHART_USERS,
    USERS,
    chartsUsersEntity,
  );

  yield all([
    spawn(handleCancelEventChannel, channel),
    spawn(handleCleanEventChannel),
  ]);

  try {
    if (!isWSChart(payload)) {
      yield cancel();
    }

    const handleEventChannel = handleEvent.bind(null, chartsUsersEntity, USERS);

    yield takeEvery(channel, handleEventChannel);
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}
export function* fetchChartUsers({ payload }) {
  const client = yield getContext('client');

  if (!isWSChart(payload)) {
    const agreegatedSchema = yield call(client.query, {
      query: fetchChartsUsersEntity,
      fetchPolicy: 'no-cache',
      variables: {
        period: payload.toUpperCase().replace(/\s+!?(\w+)$/gim, ''),
      },
    });

    const handleEventSchema = handleEvent.bind(null, chartsUsersEntity, USERS);

    yield fork(handleEventSchema, agreegatedSchema);
  }
}

/**
 * Observers for root Sagas
 */

export function* loadChartUsers() {
  while (true) {
    const { payload } = yield take(LOAD_CHART_USERS);
    yield all([fork(watchChartUsers, payload), fork(fetchChartUsers, payload)]);
  }
}
