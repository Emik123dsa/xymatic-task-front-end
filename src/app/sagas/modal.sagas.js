import {
  take,
  cancel,
  put,
  select,
  spawn,
  cancelled,
} from 'redux-saga/effects';

import * as actions from '@/actions';
import { IMPRESSIONS, PLAYS, POSTS, USERS } from '@/actions';
import { getModalClientSchema } from '@/selectors';

export function* handleModalClientSchema(modalState, modalCurrent) {
  yield put(
    actions.setVerboseModalCurrentClientSchema(modalState, modalCurrent),
  );
}

export function* watchCurrentModalClientSchema() {
  while (true) {
    const { modal } = yield take(actions.SET_MODAL_CURRENT_CLIENT_SCHEMA);

    const coercedModal = !modal.endsWith('Modal') ? `${modal}Modal` : modal;
    const modalState = yield select(getModalClientSchema);
    try {
      if (modalState && modalState.has(coercedModal)) {
        let currentModal = modalState.get(coercedModal);
        currentModal = !currentModal;
        yield spawn(handleModalClientSchema, coercedModal, currentModal);
      } else {
        yield cancel();
      }
    } finally {
      if (yield cancelled()) {
        console.warn(`[Modal]: ${modal} wasn't resolved properly`);
      }
    }
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
