import React from 'react';
import loadable from '@loadable/component';
import LazyLoading from '@/components/LazyLoading/LazyLoading';

const ProtectedAsyncComponent = loadable(() => import('./protectedRoute'), {
  fallback: <LazyLoading />,
});

export const dynamicRoutes = [
  {
    key: 'Root',
    component: loadable(() => import('@/containers/Root'), {
      fallback: <LazyLoading />,
    }),
    childRoutes: [
      {
        key: 'App',
        path: '/',
        exact: true,
        redirect: '/auth',
        component: loadable(() => import('@/containers/App'), {
          fallback: <LazyLoading />,
        }),
      },
      {
        key: 'Dashboard',
        path: '/dashboard',
        exact: true,
        redirect: '/auth',
        component: ProtectedAsyncComponent,
      },
      {
        key: 'SignUp',
        path: '/signup',
        exact: true,
        component: loadable(() => import('@/containers/SignUp'), {
          fallback: <LazyLoading />,
        }),
      },
      {
        key: 'Auth',
        path: '/auth',
        exact: true,
        component: loadable(() => import('@/containers/Auth'), {
          fallback: <LazyLoading />,
        }),
      },
      {
        key: 'Error',
        path: '*',
        component: loadable(() => import('@/containers/Error'), {
          fallback: <LazyLoading />,
        }),
      },
    ],
  },
];
