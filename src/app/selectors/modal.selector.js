import { createSelector } from 'reselect';

export const getModal = (state) => state.get('modal');

export class Period {
  static RealTime = 'Real Time';

  static Today = 'Today';

  static Yesterday = 'Yesterday';

  static Day = 'Day';

  static Month = 'Month';

  static Year = 'Year';

  static AllTime = 'All Time';
}

export const isRealTime = 'REAL TIME';

export const getModalOpenedState = createSelector(getModal, (modal) =>
  modal.get('isModalOpened'),
);

export const getModalCurrentDateSchema = createSelector(getModal, (modal) =>
  modal.get('modalCurrentDateSchema'),
);

export const getModalDateSchema = createSelector(getModal, (modal) =>
  modal.get('modalDateSchema'),
);
