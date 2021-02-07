import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { fetchAllPosts } from '@/services/actions.service';
import { NetworkStatus } from 'apollo-client';
import range from 'lodash/range';
import { PostSort } from '@/selectors/actions.selector';
import schema from '@styles/_schema.scss';
import loadable from '@loadable/component';
import { Redirect } from 'react-router';
import { classnames } from '@/shared/coerced.classnames';
import { useSelector } from 'react-redux';
import { getRouterLocation } from '@/selectors';
import { getPostPaginationVariable } from '@/selectors/pagination.selector';
import ActionLoading from '../Loading/ActionLoading';
import _ from '../Actions.scss';
import { Dots } from '../../Icons/Dots';
import ActionTemplate from '../Template';

const ActionPost = loadable(() => import('../Post/Post'));

const TemplatePost = (props) => {
  const location = useSelector((state) => getRouterLocation(state));
  const { page, redirect } = props;
  const postVariables = useSelector((state) =>
    getPostPaginationVariable(state),
  );

  const { loading, error, data, refetch, networkStatus } = useQuery(
    fetchAllPosts,
    {
      variables: { page, ...postVariables.toJS() },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    },
  );

  const loadingSeries = range(0, postVariables.get('size'));

  if (networkStatus === NetworkStatus.refetch) return refetch();
  if (loading) return <ActionLoading series={loadingSeries}> </ActionLoading>;
  if (error) return <ActionLoading series={loadingSeries}> </ActionLoading>;

  if (data?.findAllPosts && !data?.findAllPosts?.length) {
    return (
      <Redirect
        to={{
          pathname: redirect,
          state: {
            from: location.has('pathname') ? location.get('pathname') : null,
          },
        }}
      />
    );
  }

  return (
    <ActionTemplate direction="left">
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
    </ActionTemplate>
  );
};

TemplatePost.propTypes = {
  redirect: PropTypes.string,
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
};

export default TemplatePost;
