import {
  action,
  createRequestSchema,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './actions';

export const userSchema = createRequestSchema('USER');

export const userAuthentication = {
  request: (payload) => action(userSchema[REQUEST], { payload }),
  response: (payload, response) =>
    action(userSchema[SUCCESS], { payload, response }),
  failure: (payload, error) =>
    action(userSchema[FAILURE], {
      payload,
      error,
    }),
};

export const userLogOut = {
  request: () => {},
  response: () => {},
  failure: () => {},
};
