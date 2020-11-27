import { createSelector } from 'reselect';

export const getSidebar = (state) => state.get('sidebar');

export const getSidebarActions = createSelector(getSidebar, (sidebar) =>
  sidebar.get('sidebarActions'),
);

export const getSidebarFeatures = createSelector(getSidebar, (sidebar) =>
  sidebar.get('sidebarFeatures'),
);
