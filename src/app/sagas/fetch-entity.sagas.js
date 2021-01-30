import {
  call,
  cancelled,
  getContext,
  put,
  fork,
  cancel,
} from 'redux-saga/effects';

import isNull from 'lodash/isNull';
import merge from 'lodash/merge';

/**
 * Handle event to dispatch
 * them into redux store
 *
 * @export
 * @param {*} entity
 * @param {*} [payload={}]
 * @param {*} schema
 */
export function* handleEvent(entity, payload = {}, schema) {
  yield put(entity.request(payload));

  if (schema?.data) {
    yield put(entity.success(payload, schema?.data || {}));
  } else {
    yield put(entity.failure(payload, schema?.message || 'UNHANDLED ERROR'));
  }
}
/**
 * Custom fetch function to fetch
 * data via simple query
 *
 * @export
 * @param {*} { query, variables, entity }
 */
export function* fetchEvent({ query, variables = null, entity }) {
  const client = yield getContext('client');

  try {
    let payload = {
      query,
      fetchPolicy: 'no-cache',
    };

    if (!isNull(variables)) payload = merge(payload, { variables }, {});

    const schema = yield call(client.query, payload);

    if (Object.prototype.hasOwnProperty.call(schema, 'data' && 'message')) {
      yield cancel();
    }

    const handleEventFetch = handleEvent.bind(null, entity, variables);

    yield fork(handleEventFetch, schema);
  } catch (e) {
    if (yield cancelled()) {
      console.warn('[GraphQL]: Internal error');
    }
  }
}
