import { take, delay, getContext, fork } from 'redux-saga/effects';

import * as actions from '@/actions';
import { fetchChartUsers } from './charts-entity.sagas';

export function* watchModal() {
  while (true) {
    yield take(actions.SET_MODAL_IS_OPENED);
  }
}

export function* watchCurrentDateSchema() {
  while (true) {
    const { payload } = yield take(actions.SET_MODAL_CURRENT_DATE_SCHEMA);

    yield fork(fetchChartUsers, { payload });
  }
}
