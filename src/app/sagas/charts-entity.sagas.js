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
  delay,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import isEmpty from 'lodash/isEmpty';
import {
  chartsPlaysEntity,
  chartsPostsEntity,
  chartsUsersEntity,
  chartsImpressionsEntity,
  LOAD_CHART_IMPRESSIONS,
  LOAD_CHART_USERS,
  USERS,
  POSTS,
  PLAYS,
  IMPRESSIONS,
  loadChannel,
  closeChannel,
  LOAD_CHART_POSTS,
  LOAD_CHART_PLAYS,
} from '@/actions';

import {
  getChartImpression,
  getChartsEntity,
  getChartUsers,
  getEventChannel,
  isWSChart,
} from '@/selectors';

import {
  fetchChartsImpressionsEntity,
  fetchChartsPlayEntity,
  fetchChartsPostsEntity,
  fetchChartsUsersEntity,
  watchChartsImpressionsEntity,
  watchChartsPlaysEntity,
  watchChartsPostsEntity,
  watchChartsUsersEntity,
} from '@/services';
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
 *  Cancel Event handlers
 */
export function* cancelEventChannelWithEntity(entity, currentEventChannel) {
  const channel = yield select(getEventChannel, currentEventChannel);
  try {
    if (!isEmpty(channel)) yield cancel();
  } finally {
    if (yield cancelled()) channel.close();
    yield put(closeChannel(currentEventChannel));
    yield put(entity.clean(currentEventChannel));
  }
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
 * Dispatchin channel to the Redux Store
 *
 * @param { } chart
 * @param {*} channel
 */
export function* handleChannel(chart, channel, chartsEntity) {
  yield put(chartsEntity.clean(chart));
  yield put(loadChannel(chart, channel));
}
/**
 * WebSocket interaction along with
 * query schema fetching
 */
export function* watchChart({
  chart,
  current,
  chartsEntity,
  watchChartsEntity,
}) {
  const client = yield getContext('client');

  const channel = yield call(
    createEventChannel,
    client,
    watchChartsEntity,
    current,
  );

  try {
    const handleEventChannel = handleEvent.bind(
      null,
      chartsEntity,
      chart.toLowerCase(),
    );

    yield takeEvery(channel, handleEventChannel);
  } finally {
    yield call(handleChannel, chart, channel, chartsEntity);
  }
}

export const cancelEventUserChannelWithEntity = cancelEventChannelWithEntity.bind(
  null,
  chartsUsersEntity,
  USERS.toLowerCase(),
);

export const cancelEventPostsChannelWithEntity = cancelEventChannelWithEntity.bind(
  null,
  chartsPostsEntity,
  POSTS.toLowerCase(),
);

export const cancelEventPlaysChannelWithEntity = cancelEventChannelWithEntity.bind(
  null,
  chartsPlaysEntity,
  PLAYS.toLowerCase(),
);

export const cancelEventImpressionsChannelWithEntity = cancelEventChannelWithEntity.bind(
  null,
  chartsImpressionsEntity,
  IMPRESSIONS.toLowerCase(),
);

export function* fetchChart({
  chart,
  current,
  chartsEntity,
  cancelEventChannel,
  fetchChartsEntity,
}) {
  const client = yield getContext('client');

  try {
    yield fork(cancelEventChannel);

    const agreegatedSchema = yield call(client.query, {
      query: fetchChartsEntity,
      fetchPolicy: 'no-cache',
      variables: {
        period: current.toUpperCase().replace(/\s+!?(\w+)$/gim, ''),
      },
    });

    const handleEventSchema = handleEvent.bind(null, chartsEntity, chart);

    yield fork(handleEventSchema, agreegatedSchema);
  } finally {
    if (yield cancelled()) {
      console.warn('[GraphQL] : Unrecognized charts entity');
    }
  }
}

/**
 * Observers for root Sagas
 * */
export function* loadChartUsers() {
  while (true) {
    const { current, chart } = yield take(LOAD_CHART_USERS);

    const payload = {
      chart,
      current,
      chartsEntity: chartsUsersEntity,
    };

    if (isWSChart(current)) {
      yield spawn(watchChart, {
        ...payload,
        watchChartsEntity: watchChartsUsersEntity,
      });
    } else {
      yield spawn(fetchChart, {
        ...payload,
        cancelEventChannel: cancelEventUserChannelWithEntity,
        fetchChartsEntity: fetchChartsUsersEntity,
      });
    }
  }
}

export function* loadChartPosts() {
  while (true) {
    const { current, chart } = yield take(LOAD_CHART_POSTS);

    const payload = {
      chart,
      current,
      chartsEntity: chartsPostsEntity,
    };

    if (isWSChart(current)) {
      yield spawn(watchChart, {
        ...payload,
        watchChartsEntity: watchChartsPostsEntity,
      });
    } else {
      yield spawn(fetchChart, {
        ...payload,
        cancelEventChannel: cancelEventPostsChannelWithEntity,
        fetchChartsEntity: fetchChartsPostsEntity,
      });
    }
  }
}

export function* loadChartImpressions() {
  while (true) {
    const { current, chart } = yield take(LOAD_CHART_IMPRESSIONS);

    const payload = {
      chart,
      current,
      chartsEntity: chartsImpressionsEntity,
    };

    if (isWSChart(current)) {
      yield spawn(watchChart, {
        ...payload,
        watchChartsEntity: watchChartsImpressionsEntity,
      });
    } else {
      yield spawn(fetchChart, {
        ...payload,
        cancelEventChannel: cancelEventImpressionsChannelWithEntity,
        fetchChartsEntity: fetchChartsImpressionsEntity,
      });
    }
  }
}

export function* loadChartPlays() {
  while (true) {
    const { current, chart } = yield take(LOAD_CHART_PLAYS);

    const payload = {
      chart,
      current,
      chartsEntity: chartsPlaysEntity,
    };

    if (isWSChart(current)) {
      yield spawn(watchChart, {
        ...payload,
        watchChartsEntity: watchChartsPlaysEntity,
      });
    } else {
      yield spawn(fetchChart, {
        ...payload,
        cancelEventChannel: cancelEventPlaysChannelWithEntity,
        fetchChartsEntity: fetchChartsPlayEntity,
      });
    }
  }
}
