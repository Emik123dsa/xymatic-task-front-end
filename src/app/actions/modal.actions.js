import { action } from './actions';

export const SET_MODAL_CURRENT_DATE_SCHEMA = 'SET_MODAL_CURRENT_DATE_SCHEMA';

export const setModalCurrentDateSchema = (chart, current) =>
  action(SET_MODAL_CURRENT_DATE_SCHEMA, { chart, current });
