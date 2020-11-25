import React from 'react';
import loadable from '@loadable/component';
import LazyLoading from '@/components/LazyLoading/LazyLoading.jsx';

const AsyncComponent = (props) =>
  loadable(() => import(`@/components/${props}/${props}`), {
    fallback: <LazyLoading />,
  });

export const AppRoutes = [
  {
    key: 'Dashboard',
    path: '/dashboard',
    exact: true,
    component: AsyncComponent('Dashboard'),
  },
];
