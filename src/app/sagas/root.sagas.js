/* eslint-disable object-curly-newline */
import { all, fork, getContext, setContext } from 'redux-saga/effects';
import { client } from '~/apolloConfig';
import { loadChartUsers } from './charts-entity.sagas';
import { watchResize } from './resize.sagas';
import { watchCurrentDateSchema, watchModal } from './modal.sagas';
import { watchNewUser, watchUserAuth } from './user.sagas';

export function* rootSaga() {
  yield setContext({ client: client() });
  yield all([
    fork(watchResize),
    fork(watchCurrentDateSchema),
    fork(loadChartUsers),
    fork(watchModal),
    fork(watchNewUser),
    fork(watchUserAuth),
  ]);
}
