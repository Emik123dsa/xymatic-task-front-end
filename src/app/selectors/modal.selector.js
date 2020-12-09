import { createSelector } from 'reselect';

export const getModal = (state) => state.get('modal');

export const getModalOpenedState = createSelector(getModal, (modal) =>
  modal.get('isModalOpened'),
);

export const getModalDateSchema = createSelector(getModal, (modal) =>
  modal.get('modalDateSchema'),
);
