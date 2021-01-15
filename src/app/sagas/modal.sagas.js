import { take, fork, call, put } from 'redux-saga/effects';

import * as actions from '@/actions';
import { IMPRESSIONS, PLAYS, POSTS, USERS } from '@/actions';

export function* watchCurrentModalClientSchema() {
  while (true) {
    const { modal } = yield take(actions.SET_MODAL_CURRENT_CLIENT_SCHEMA);
    console.log(modal);
  }
}

export function* watchCurrentDateSchema() {
  while (true) {
    const { chart, current } = yield take(
      actions.SET_MODAL_CURRENT_DATE_SCHEMA,
    );

    switch (chart.toUpperCase()) {
      case USERS:
        yield put(actions.loadChartsUsersEntity(current));
        break;
      case POSTS:
        yield put(actions.loadChartsPostsEntity(current));
        break;
      case IMPRESSIONS:
        yield put(actions.loadChartsImpressionsEntity(current));
        break;
      case PLAYS:
        yield put(actions.loadChartsPlaysEntity(current));
        break;
      default:
        console.warn(`[GraphQL] Unrecognized chart entity: ${chart}`);
        break;
    }
  }
}
