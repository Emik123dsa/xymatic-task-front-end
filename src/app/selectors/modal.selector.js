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

export const getModalDateSchema = createSelector(getModal, (modal) =>
  modal.get('modalDateSchema'),
);

export const getModalClientSchema = createSelector(getModal, (modal) =>
  modal.get('modalClientSchema'),
);
