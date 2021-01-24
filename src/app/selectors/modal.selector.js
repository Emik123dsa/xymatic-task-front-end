/* eslint-disable max-classes-per-file */
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

  static Manual = 'Manual';
}

export class OverridedModal {
  /**
   * Modal factory
   *
   * @static
   * @returns
   * @memberof Modal
   */
  static MODAL_FACTORY() {
    return {
      clientSchema: null,
    };
  }

  /**
   * Modal style facade
   *
   * @readonly
   * @memberof Modal
   */
  static get modalStyleFacade() {
    return {
      overlay: {
        zIndex: '2 !important',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      content: {
        zIndex: '2 !important',
        borderRadius: '2rem',
      },
    };
  }
}

export const getModalDateSchema = createSelector(getModal, (modal) =>
  modal.get('modalDateSchema'),
);

export const getModalClientSchema = createSelector(getModal, (modal) =>
  modal.get('modalClientSchema'),
);
