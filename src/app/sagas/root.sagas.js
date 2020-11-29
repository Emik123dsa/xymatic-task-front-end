import { all, fork } from 'redux-saga/effects';
import { watchResize } from './resize.sagas';

export function* rootSaga() {
  yield all([fork(watchResize)]);
}
