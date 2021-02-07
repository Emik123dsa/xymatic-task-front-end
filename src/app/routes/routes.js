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
            key: 'Main Dashboard',
            path: '/dashboard/',
            exact: true,
            strict: false,
            component: loadable(() => import('@/containers/MainDashboard'), {
              fallback: <LazyLoading />,
            }),
          },
          /// //////////////////////////////////////////////////
          // Users Schema Routes
          /// ////////////////////////////////////////////////
          {
            key: 'Users',
            path: '/dashboard/users',
            exact: true,
            strict: false,
            component: loadable(() => import('@/containers/Users'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Users',
            path: '/dashboard/users/:schemaID',
            exact: true,
            strict: false,
            component: loadable(() => import('@/containers/Users'), {
              fallback: <LazyLoading />,
            }),
          },
          /// //////////////////////////////////////////////////
          // Impressions Schema Routes
          /// ////////////////////////////////////////////////
          {
            key: 'Impressions',
            path: '/dashboard/impressions/',
            exact: true,
            strict: false,
            component: loadable(() => import('~/app/containers/Impressions'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Impressions',
            path: '/dashboard/impressions/:schemaID',
            exact: true,
            strict: false,
            component: loadable(() => import('~/app/containers/Impressions'), {
              fallback: <LazyLoading />,
            }),
          },
          /// //////////////////////////////////////////////////
          // Plays Schema Routes
          /// ////////////////////////////////////////////////
          {
            key: 'Plays',
            path: '/dashboard/plays',
            exact: true,
            strict: false,
            component: loadable(() => import('@/containers/Plays'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Plays',
            path: '/dashboard/plays/:schemaID',
            exact: true,
            strict: false,
            component: loadable(() => import('@/containers/Plays'), {
              fallback: <LazyLoading />,
            }),
          },
          /// //////////////////////////////////////////////////
          // Posts Schema Routes
          /// ////////////////////////////////////////////////
          {
            key: 'Posts',
            path: '/dashboard/posts',
            exact: true,
            strict: false,
            component: loadable(() => import('@/containers/Posts'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Posts',
            path: '/dashboard/posts/:schemaID',
            exact: true,
            strict: false,
            component: loadable(() => import('@/containers/Posts'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Analytics',
            path: '/dashboard/analytics',
            exact: true,
            strict: false,
            component: loadable(() => import('@/containers/Analytics'), {
              fallback: <LazyLoading />,
            }),
          },
          {
            key: 'Error',
            path: '**',
            strict: false,
            exact: false,
            redirect: '/dashboard',
            component: loadable(() => import('@/containers/Error'), {
              fallback: <LazyLoading />,
            }),
          },
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
