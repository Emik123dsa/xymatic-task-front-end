/* eslint-disable object-curly-newline */
import { all, fork, getContext, setContext } from 'redux-saga/effects';
import { client } from '~/apolloConfig';
import { watchLoadChartUsers } from './charts-entity.sagas';
import { watchResize } from './resize.sagas';
import { watchModal } from './modal.sagas';

export function* rootSaga() {
  yield setContext({ client: client() });
  yield all([fork(watchResize), fork(watchModal), fork(watchLoadChartUsers)]);
}
