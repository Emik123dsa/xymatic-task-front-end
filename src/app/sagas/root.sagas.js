import { all, fork } from 'redux-saga/effects';
import { watchLoadChartImpressions } from './charts-entity.sagas';
import { watchResize } from './resize.sagas';

export function* rootSaga() {
  yield all([fork(watchResize), fork(watchLoadChartImpressions)]);
}
