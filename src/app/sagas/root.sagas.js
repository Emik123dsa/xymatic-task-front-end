/* eslint-disable object-curly-newline */
import { all, fork, setContext } from 'redux-saga/effects';
import { client } from '~/apollo.config';
import {
  loadChartImpressions,
  loadChartPlays,
  loadChartPosts,
  loadChartRowsAmountEntity,
  loadChartUsers,
  resetChartsEntities,
} from './charts-entity.sagas';
import { watchResize } from './resize.sagas';
import {
  watchCurrentDateSchema,
  watchCurrentModalClientSchema,
} from './modal.sagas';
import { watchCurrentUser, watchNewUser, watchUserAuth } from './user.sagas';
import { watchErrors } from './error.sagas';
import { loadPaginatedPostsEntity } from './pagination.sagas';

export function* rootSaga() {
  yield setContext({ client: client() });
  yield all([
    /**
     * Utils Principle
     */
    fork(watchResize),
    fork(watchCurrentModalClientSchema),
    fork(watchCurrentDateSchema),
    /**
     *  Web Socket Fetchers for chart entity
     */
    fork(loadChartUsers),
    fork(loadChartPosts),
    fork(loadChartImpressions),
    fork(loadChartPlays),

    /**
     *  Rows Table Enumeration Principle
     */
    fork(loadChartRowsAmountEntity),
    /**
     *  Pagination factories
     */
    fork(loadPaginatedPostsEntity),
    /**
     * We merely demand
     * to unsubcribe  from all
     * of the sagas event channel
     * to prevent forward execution
     * in the next routers
     */
    fork(resetChartsEntities),
    /**
     *  User Authentication Principle
     */
    fork(watchNewUser),
    fork(watchUserAuth),
    fork(watchErrors),
    fork(watchCurrentUser),
  ]);
}
