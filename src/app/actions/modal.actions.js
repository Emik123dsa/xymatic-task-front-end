import { action } from './actions';

export const SET_MODAL_IS_OPENED = 'SET_MODAL_IS_OPENED';

export const setModalIsOpened = (isModalOpened) =>
  action(SET_MODAL_IS_OPENED, isModalOpened);
