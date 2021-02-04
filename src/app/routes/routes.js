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
    path: '/',
    component: loadable(() => import('@/containers/Root'), {
      fallback: <LazyLoading />,
    }),
    routes: [
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
        exact: false,
        strict: true,
        redirect: '/auth',
        component: ProtectedAsyncComponent,
        routes: [
          {
            key: 'Impressions',
            path: '/dashboard',
            exact: true,
            component: loadable(() => import('@/containers/Impressions'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Plays',
            path: '/dashboard/plays/:id',
            exact: true,
            component: loadable(() => import('@/containers/Plays'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Posts',
            path: '/dashboard/posts/:id',
            exact: false,
            component: loadable(() => import('@/containers/Posts'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Users',
            path: '/dashboard/users/:id',
            exact: false,
            component: loadable(() => import('@/containers/Users'), {
              fallback: <LazyLoading />,
            }),
          },
          // {
          //   key: 'Error',
          //   path: '/dashboard/**',
          //   strict: false,
          //   exact: false,
          //   component: loadable(() => import('@/containers/Error'), {
          //     fallback: <LazyLoading />,
          //   }),
          // },
        ],
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
