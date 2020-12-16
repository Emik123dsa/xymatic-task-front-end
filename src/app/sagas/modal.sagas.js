import { take, fork, put } from 'redux-saga/effects';

import * as actions from '@/actions';

import { watchChartUsers, fetchChartUsers } from './charts-entity.sagas';
import { isWSChart } from '../selectors';

export function* watchModal() {
  while (true) {
    yield take(actions.SET_MODAL_IS_OPENED);
  }
}

export function* watchCurrentDateSchema() {
  while (true) {
    const { payload } = yield take(actions.SET_MODAL_CURRENT_DATE_SCHEMA);

    if (!isWSChart(payload)) {
      yield fork(fetchChartUsers, { payload });
    } else {
      yield fork(watchChartUsers, { payload });
    }
  }
}
