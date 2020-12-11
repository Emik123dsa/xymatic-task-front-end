import { action } from './actions';

export const SET_MODAL_IS_OPENED = 'SET_MODAL_IS_OPENED';

export const SET_MODAL_CURRENT_DATE_SCHEMA = 'SET_MODAL_CURRENT_DATE_SCHEMA';

export const setModalIsOpened = (isModalOpened) =>
  action(SET_MODAL_IS_OPENED, isModalOpened);

export const setModalCurrentDateSchema = (modalCurrentDateSchema) =>
  action(SET_MODAL_CURRENT_DATE_SCHEMA, modalCurrentDateSchema);
