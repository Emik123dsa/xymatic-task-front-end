import React, { PureComponent, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { fetchAllPosts } from '@/services/actions.service';
import { NetworkStatus } from 'apollo-client';
import range from 'lodash/range';
import { classnames } from '@/shared/coercedClassnames';
import { PostSort } from '@/selectors/actions.selector';
import schema from '@styles/_schema.scss';
import loadable from '@loadable/component';
import ActionLoading from './ActionLoading';
import _ from './Actions.scss';
import { Dots } from '../Icons/Dots';

const ActionPost = loadable(() => import('./ActionPost'));

const ActionsTemplate = (props) => (
  <div className={_.actions}>
    <div className={classnames(_['actions-wrapper'], schema['pt-2'])}>
      {React.Children.map(props.children, (mutableChild) => {
        if (!mutableChild) return null;
        return React.cloneElement(mutableChild);
      })}
    </div>
  </div>
);

ActionsTemplate.propTypes = { children: PropTypes.array };

const Actions = () => {
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
    <ActionsTemplate>
      <div className={schema['row-b']}>
        <div
          className={classnames(
            schema['d-flex'],
            schema['justify-content-between'],
            schema['col-b-12'],
          )}
        >
          <h4> Top Adored Posts </h4>
          <Dots />
        </div>
      </div>
      <div className={schema['row-b']}>
        <ActionPost posts={data} />
      </div>
    </ActionsTemplate>
  );
};

export default Actions;
