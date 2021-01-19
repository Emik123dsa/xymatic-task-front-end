import { action } from './actions';

export const SET_MODAL_CURRENT_DATE_SCHEMA = 'SET_MODAL_CURRENT_DATE_SCHEMA';

export const SET_MODAL_CURRENT_CLIENT_SCHEMA =
  'SET_MODAL_CURRENT_CLIENT_SCHEMA';

export const SET_VERBOSE_CURRENT_CLIENT_SCHEMA =
  'SET_VERBOSE_CURRENT_CLIENT_SCHEMA';

export const setModalCurrentDateSchema = (chart, current) =>
  action(SET_MODAL_CURRENT_DATE_SCHEMA, { chart, current });

export const setModalCurrentClientSchema = (modal) =>
  action(SET_MODAL_CURRENT_CLIENT_SCHEMA, { modal });

export const setVerboseModalCurrentClientSchema = (modal, state) =>
  action(SET_VERBOSE_CURRENT_CLIENT_SCHEMA, {
    modalState: state,
    modalCurrent: modal,
  });
