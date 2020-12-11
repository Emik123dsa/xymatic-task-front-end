/* eslint-disable object-curly-newline */
import { all, fork, getContext, setContext } from 'redux-saga/effects';
import { client } from '~/apolloConfig';
import { watchLoadChartUsers } from './charts-entity.sagas';
import { watchResize } from './resize.sagas';
import { watchCurrentDateSchema, watchModal } from './modal.sagas';

export function* rootSaga() {
  yield setContext({ client: client() });
  yield all([
    fork(watchResize),
    fork(watchCurrentDateSchema),
    fork(watchLoadChartUsers),
    fork(watchModal),
  ]);
}
