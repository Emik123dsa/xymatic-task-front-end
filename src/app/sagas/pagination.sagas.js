import { select, spawn, take } from 'redux-saga/effects';
import { LOAD_PAGINATED_POSTS } from '@/actions/paginated.actions';

import {
  getPostPaginationData,
  getPostPaginationVariable,
} from '@/selectors/pagination.selector';

import { fetchEvent } from './fetch-entity.sagas';

export function* loadPaginatedPostsEntity() {
  while (true) {
    const { page } = yield take(LOAD_PAGINATED_POSTS);
    const variables = yield select(getPostPaginationVariable);

    console.log(page);
    // yield spawn(fetchEvent, {
    //   query:  fetchPagina,
    //   entity: loadPaginatedPostsEntity
    // });
  }
}
