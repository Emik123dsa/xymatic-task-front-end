import { fromJS } from 'immutable';

import {
  PostSort,
  ImpressionSort,
  PlaySort,
  UserSort,
} from '@/selectors/actions.selector';

const initialPaginationVariablesFactory = ($schema) =>
  fromJS({
    variables: {
      size: 20,
      sort: $schema,
    },
    data: [],
  });

const initialPaginationReducer = fromJS({
  impressions: initialPaginationVariablesFactory({
    date: ImpressionSort.date.CREATED_AT,
    direction: ImpressionSort.direction.DESC,
  }),
  plays: initialPaginationVariablesFactory({
    date: PlaySort.date.CREATED_AT,
    direction: PlaySort.direction.DESC,
  }),
  posts: initialPaginationVariablesFactory({
    date: PostSort.date.CREATED_AT,
    direction: PostSort.direction.DESC,
  }),
  users: initialPaginationVariablesFactory({
    date: UserSort.date.CREATED_AT,
    direction: UserSort.direction.DESC,
  }),
});

export const paginationReducer = (state = initialPaginationReducer, action) =>
  state;
