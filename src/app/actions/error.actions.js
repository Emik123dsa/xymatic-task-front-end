import { action } from './actions';

export const SET_ERROR_MESSAGE = 'SET_ERRORS';

export const setErrorMessage = (errors = {}) =>
  action(SET_ERROR_MESSAGE, errors);
