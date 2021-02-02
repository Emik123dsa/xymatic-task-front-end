import React, { PureComponent, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { fetchAllPosts } from '@/services/actions.service';
import { NetworkStatus } from 'apollo-client';
import range from 'lodash/range';
import { PostSort } from '@/selectors/actions.selector';
import schema from '@styles/_schema.scss';
import loadable from '@loadable/component';
import { css } from 'aphrodite';
import { classnames } from '~/app/shared/coerced.classnames';
import ActionLoading from './ActionLoading';
import _ from './Actions.scss';
import { Dots } from '../Icons/Dots';
import ActionsTemplate from './ActionsTemplate';
import { styles } from '~/app/shared/coerced.styles';

const ActionPost = loadable(() => import('./ActionPost'));

const ActionsPost = () => {
  const [variables, setVariables] = useState({
    page: 0,
    size: 10,
    sort: {
      date: PostSort.date.CREATED_AT,
      direction: PostSort.direction.DESC,
    },
  });

  const { loading, error, data, refetch, networkStatus } = useQuery(
    fetchAllPosts,
    {
      variables,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    },
  );

  const loadingSeries = range(0, variables.size);

  if (networkStatus === NetworkStatus.refetch) return refetch();
  if (loading) return <ActionLoading series={loadingSeries}> </ActionLoading>;
  if (error) return <ActionLoading series={loadingSeries}> </ActionLoading>;

  return (
    <ActionsTemplate direction="left">
      <div className={classnames(schema.row, schema['mx-1'])}>
        <div
          className={classnames(
            schema['d-flex'],
            schema['justify-content-between'],
            schema['col-b-12'],
          )}
        >
          <h4 className={_['actions-title']}> Top Adored Posts </h4>
          <Dots />
        </div>
      </div>
      <div className={_['actions-stripe']}></div>
      <div className={classnames(schema.row, schema['mx-1'], schema['pt-1'])}>
        <div className={schema['col-b-12']}>
          <ActionPost posts={data} />
        </div>
      </div>
    </ActionsTemplate>
  );
};

export default ActionsPost;
