import {
  action,
  createRequestSchema,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './actions';

export const LOAD_AUTH_USER = 'LOAD_AUTH_USER';
export const LOAD_NEW_USER = 'LOAD_NEW_USER';
export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';

export const authSchema = createRequestSchema('AUTH_USER');
export const newUserSchema = createRequestSchema('NEW_USER');
export const currentUser = createRequestSchema('CURRENT_USER');

export const createNewUser = {
  request: (payload) => action(newUserSchema[REQUEST], { payload }),
  success: (payload, newUserSuccess) =>
    action(newUserSchema[SUCCESS], { payload, newUserSuccess }),
  failure: (payload, error) =>
    action(newUserSchema[FAILURE], {
      payload,
      error,
    }),
};

export const authUser = {
  request: (payload) => action(authSchema[REQUEST], { payload }),
  success: (payload, signInSuccess) =>
    action(authSchema[SUCCESS], { payload, signInSuccess }),
  failure: (payload, error) =>
    action(authSchema[FAILURE], {
      payload,
      error,
    }),
};

export const getCurrentUser = {
  request: (payload) => action(currentUser[REQUEST], { payload }),
  success: (payload, getCurrentUserSuccess) =>
    action(currentUser[SUCCESS], { payload, getCurrentUserSuccess }),
  failure: (payload, error) =>
    action(currentUser[FAILURE], {
      payload,
      error,
    }),
};

export const setLoadAuth = (payload) => action(LOAD_AUTH_USER, payload);

export const setLoadNewUser = (payload) => action(LOAD_NEW_USER, payload);

export const setLoadCurrentUser = (payload) =>
  action(LOAD_CURRENT_USER, payload);
