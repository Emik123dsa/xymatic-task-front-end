import React from 'react';
import loadable from '@loadable/component';
import LazyLoading from '@/components/LazyLoading/LazyLoading.jsx';
import { AppRoutes } from './app.routes';

export const AsyncContainer = (props) =>
  loadable(() => import(`@/containers/${props}`), {
    fallback: <LazyLoading />,
  });

export const ContainerRoutes = [
  {
    component: AsyncContainer('App'),
    routes: [
      {
        key: 'SignUp',
        path: '/signup',
        exact: true,
        component: AsyncContainer('SignUp'),
      },
      {
        key: 'Auth',
        path: '/auth',
        exact: true,
        component: AsyncContainer('Auth'),
      },
      {
        key: 'Error',
        component: AsyncContainer('Error'),
      },
    ],
  },
];
