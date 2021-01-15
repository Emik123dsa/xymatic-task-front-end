import { fromJS } from 'immutable';
import { Period } from '@/selectors';

export const initialModalReducer = fromJS({
  modalDateSchema: [
    [Period.RealTime],
    [Period.Today],
    [Period.Yesterday],
    [Period.Day],
    [Period.Month],
    [Period.Year],
    [Period.AllTime],
  ],
  modalClientSchema: {
    settingsModal: false,
    logOutModal: false,
    manualModal: false,
  },
});

export const modalReducer = (state = initialModalReducer, action) => state;
