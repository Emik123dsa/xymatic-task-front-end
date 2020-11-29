import { createSelector } from 'reselect';

export const getResize = (state) => state.get('resize');

export const getMobile = createSelector(getResize, (resize) =>
  resize.get('isMobile'),
);
