import React from 'react';
import loadable from '@loadable/component';
import LazyLoading from '@/components/LazyLoading/LazyLoading.jsx';

export const dynamicRoutes = [
  {
    key: 'Root',
    path: '/',
    component: loadable(() => import(`@/containers/Root`), {
      fallback: <LazyLoading />,
    }),
    routes: [
      {
        key: 'App',
        path: '/',
        exact: true,
        component: loadable(() => import(`@/containers/App`), {
          fallback: <LazyLoading />,
        }),
      },
      {
        key: 'Dashboard',
        path: '/dashboard',
        exact: true,
        component: loadable(() => import(`@/containers/Dashboard`), {
          fallback: <LazyLoading />,
        }),
      },
      {
        key: 'SignUp',
        path: '/signup',
        exact: true,
        component: loadable(() => import(`@/containers/SignUp`), {
          fallback: <LazyLoading />,
        }),
      },
      {
        key: 'Auth',
        path: '/auth',
        exact: true,
        component: loadable(() => import(`@/containers/Auth`), {
          fallback: <LazyLoading />,
        }),
      },
      {
        key: 'Error',
        component: loadable(() => import(`@/containers/Error`), {
          fallback: <LazyLoading />,
        }),
      },
    ],
  },
];
