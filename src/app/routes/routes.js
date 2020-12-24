import React from 'react';
import loadable from '@loadable/component';
import LazyLoading from '@/components/LazyLoading/LazyLoading';

const ProtectedAsyncComponent = loadable(() => import('./protectedRoute'), {
  fallback: <LazyLoading />,
});

export const dynamicRoutes = [
  {
    key: 'Root',
    strict: true,
    component: loadable(() => import('@/containers/Root'), {
      fallback: <LazyLoading />,
    }),
    childRoutes: [
      {
        key: 'App',
        path: '/',
        exact: true,
        redirect: '/dashboard',
        component: ProtectedAsyncComponent,
      },
      {
        key: 'Dashboard',
        path: '/dashboard',
        exact: true,
        redirect: '/auth',
        component: ProtectedAsyncComponent,
        // childRoutes: [],
      },
      {
        key: 'SignUp',
        path: '/signup',
        exact: true,
        strict: true,
        isPublic: true,
        redirect: '/dashboard',
        component: ProtectedAsyncComponent,
      },
      {
        key: 'Auth',
        path: '/auth',
        exact: true,
        strict: true,
        isPublic: true,
        redirect: '/dashboard',
        component: ProtectedAsyncComponent,
      },
      {
        key: 'Error',
        path: '**',
        strict: false,
        exact: false,
        component: loadable(() => import('@/containers/Error'), {
          fallback: <LazyLoading />,
        }),
      },
    ],
  },
];
