import React from 'react';

import loadable from '@loadable/component';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import { chartConfig } from '~/chart.config';
import LazyLoading from '../components/LazyLoading/LazyLoading';

export const AsyncAction = loadable(
  (props) => import(`@/components/Actions/${props?.name}`),
  {
    fallback: <SkeletonLoading height={chartConfig.actionsHeight} />,
  },
);

export const AsyncLayout = loadable((props) =>
  import(`@/components/${props?.name}/${props?.name}`),
);

export const AsyncTinyChart = loadable(
  () => import('@/components/Charts/CustomTinyChart/CustomTinyChart'),
  {
    fallback: <SkeletonLoading height={chartConfig.tinyHeight} />,
  },
);

export const AsyncEssentialChart = loadable(
  () => import('@/components/Charts/CustomEssentialChart/CustomEssentialChart'),
  {
    fallback: <SkeletonLoading height={chartConfig.essentialHeight} />,
  },
);

export const AsyncPieChart = loadable(
  () => import('@/components/Charts/CustomPieChart/CustomPieChart'),
  {
    fallback: <SkeletonLoading height={chartConfig.essentialHeight} />,
  },
);

export const AsyncComponent = loadable(
  (props) => import(`@/components/${props.name}/${props.name}`),
  {
    fallback: <LazyLoading />,
  },
);

export const AsyncAuthModal = loadable(
  (props) => import(`@/components/Auth/${props?.name}/${props?.name}`),
  {
    fallback: <LazyLoading />,
  },
);

export const AsyncChartModal = loadable(
  (props) => import(`@/components/Charts/${props?.name}/${props?.name}`),
  {
    fallback: <LazyLoading />,
  },
);
