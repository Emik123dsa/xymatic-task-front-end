import { take, fork, call, put } from 'redux-saga/effects';

import * as actions from '@/actions';

import { watchChartUsers, fetchChartUsers } from './charts-entity.sagas';
import { isWSChart } from '../selectors';

export function* watchModal() {
  while (true) {
    yield take(actions.SET_MODAL_IS_OPENED);
  }
}

export function* cleanEntity(_, entity) {
  yield put(_.clean(entity));
}

const cleanUserChart = cleanEntity.bind(null, actions.chartsUsersEntity);

export function* watchCurrentDateSchema() {
  while (true) {
    const { payload } = yield take(actions.SET_MODAL_CURRENT_DATE_SCHEMA);

    yield call(cleanUserChart, actions.USERS);

    if (!isWSChart(payload)) {
      yield fork(fetchChartUsers, { payload });
    } else {
      yield fork(watchChartUsers, { payload });
    }
  }
}
