import { action } from './actions';

export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const setErrorMessage = (payload = {}) =>
  action(SET_ERROR_MESSAGE, { payload });

export const resetErrorMessage = (payload = {}) =>
  action(RESET_ERROR_MESSAGE, { payload: [] });
