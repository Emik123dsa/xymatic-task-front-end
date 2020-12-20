import {
  action,
  createRequestSchema,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './actions';

export const LOAD_AUTH_USER = 'LOAD_AUTH_USER';
export const LOAD_NEW_USER = 'LOAD_NEW_USER';

export const authSchema = createRequestSchema('AUTH_USER');
export const newUserSchema = createRequestSchema('NEW_USER');

export const createNewUser = {
  request: (payload) => action(newUserSchema[REQUEST], { payload }),
  response: (payload, response) =>
    action(newUserSchema[SUCCESS], { payload, response }),
  failure: (payload, error) =>
    action(newUserSchema[FAILURE], {
      payload,
      error,
    }),
};

export const authUser = {
  request: (payload) => action(authSchema[REQUEST], { payload }),
  response: (payload, response) =>
    action(authSchema[SUCCESS], { payload, response }),
  failure: (payload, error) =>
    action(authSchema[FAILURE], {
      payload,
      error,
    }),
};

export const setLoadAuth = (email, password) =>
  action(LOAD_AUTH_USER, { email, password });

export const setLoadNewUser = (name, email, password) =>
  action(LOAD_AUTH_USER, { name, email, password });
