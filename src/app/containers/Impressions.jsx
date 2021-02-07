import React, { Component, Fragment, useState } from 'react';
import _ from '@styles/_schema.scss';
import { hot } from 'react-hot-loader/root';
import { AsyncPagination, AsyncTemplate } from '@/shared/coerced.actions';
import { classnames } from '@/shared/coerced.classnames';
import { useSelector } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import { Redirect } from 'react-router';
import { getRouterLocation } from '../selectors';
import useValidator from '../hooks/useValidator';

const Impressions = () => {
  const [schema, setSchema] = useState('impressions');
  const [redirect, setRedirect] = useState('/dashboard/impressions');
  const location = useSelector((state) => getRouterLocation(state));
  const router = useValidator(/^\d+$/gi);

  if (isUndefined(router))
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

  return (
    <Fragment>
      <section className={_['px-2']}>
        <div className={classnames(_['row-b'], _['hidden-x'], _['py-1'])}>
          <div className={_['col-b-12']}>
            <AsyncTemplate
              page={router}
              name="TemplatePost"
              redirect={redirect}
            />
          </div>
        </div>
        <div className={classnames(_['row-b'], _['pt-1'])}>
          <div className={_['col-b-12']}>
            <AsyncPagination schema={schema} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default hot(Impressions);
