/* eslint-disable object-curly-newline */
import { put, call, select, take, fork } from 'redux-saga/effects';

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

export function* fetchChartsEntity(entity, callback, payload, url) {
  yield put(entity.request(payload));

  const { response, error } = yield call(callback, url || payload);

  if (response) {
    yield put(entity.success(payload, response));
  } else {
    yield put(entity.failure(payload, error));
  }
}

export const fetchChartImpressions = fetchChartsEntity.bind(
  null,
  chartsImmersionsEntity,
  fetchChartsImpressionsEntity,
);

export const fetchChartPlays = fetchChartsEntity.bind(
  null,
  chartsPlaysEntity,
  fetchChartsPlaysEntity,
);

export const fetchChartPosts = fetchChartsEntity.bind(
  null,
  chartsPostsEntity,
  fetchChartsPostsEntity,
);

export const fetchChartUsers = fetchChartsEntity.bind(
  null,
  chartsUsersEntity,
  fetchChartsUsersEntity,
);

function* loadChartImpressions(payload) {
  const chartImpression = yield select(getChartImpression, payload);
  if (!Array.isArray(chartImpression)) {
    yield call(fetchChartImpressions, payload);
  }
}

export function* watchLoadChartImpressions() {
  while (true) {
    const { payload } = yield take(LOAD_CHART_IMPRESSIONS);
    yield fork(loadChartImpressions, payload);
  }
}
