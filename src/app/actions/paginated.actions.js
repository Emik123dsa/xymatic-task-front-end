import {
  action,
  createRequestSchema,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './actions';

export const paginatedPostsSchema = createRequestSchema('PAGINATED_POSTS');
export const paginatedImpressionsSchema = createRequestSchema(
  'PAGINATED_IMPRESSIONS',
);
export const paginatedPlaysSchema = createRequestSchema('PAGINATED_PLAYS');
export const paginatedUsersSchema = createRequestSchema('PAGINATED_USERS');

export const LOAD_PAGINATED_POSTS = 'LOAD_PAGINATED_POSTS';
export const LOAD_PAGINATED_IMPRESSIONS = 'LOAD_PAGINATED_POSTS';
export const LOAD_PAGINATED_PLAYS = 'LOAD_PAGINATED_PLAYS';
export const LOAD_PAGINATED_USERS = 'LOAD_PAGINATED_USERS';

export const paginatedPostsEntity = {
  request: (payload) => action(paginatedPostsSchema[REQUEST], payload),
  success: (payload, pagination) =>
    action(paginatedPostsSchema[REQUEST], { pagination }),
  failure: (payload, error) => action(paginatedPostsSchema[FAILURE], { error }),
};

export const paginatedPlaysEntity = {
  request: (payload) => action(paginatedPlaysSchema[REQUEST], payload),
  success: (payload, pagination) =>
    action(paginatedPlaysSchema[REQUEST], { pagination }),
  failure: (payload, error) => action(paginatedPlaysSchema[FAILURE], { error }),
};

export const paginatedUsersEntity = {
  request: (payload) => action(paginatedUsersSchema[REQUEST], payload),
  success: (payload, pagination) =>
    action(paginatedUsersSchema[REQUEST], { pagination }),
  failure: (payload, error) => action(paginatedUsersSchema[FAILURE], { error }),
};

export const paginatedImpressionsEntity = {
  request: (payload) => action(paginatedImpressionsSchema[REQUEST], payload),
  success: (payload, pagination) =>
    action(paginatedImpressionsSchema[REQUEST], { pagination }),
  failure: (payload, error) =>
    action(paginatedImpressionsSchema[FAILURE], { error }),
};

export const loadPaginatedPosts = ({ size, page, sort }) =>
  action(LOAD_PAGINATED_POSTS, { size, page, sort });

export const loadPaginatedPlays = ({ size, page, sort }) =>
  action(LOAD_PAGINATED_PLAYS, { size, page, sort });

export const loadPaginatedImpressions = ({ size, page, sort }) =>
  action(LOAD_PAGINATED_IMPRESSIONS, { size, page, sort });

export const loadPaginatedUsers = ({ size, page, sort }) =>
  action(LOAD_PAGINATED_USERS, { size, page, sort });
