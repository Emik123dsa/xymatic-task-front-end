import React, { Component, Fragment, useState, useEffect } from 'react';
import _ from '@styles/_schema.scss';
import { hot } from 'react-hot-loader/root';
import { AsyncPagination, AsyncTemplate } from '@/shared/coerced.actions';
import { classnames } from '@/shared/coerced.classnames';
import { useSelector } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import { Redirect } from 'react-router';
import useValidator from '@/hooks/useValidator';
import { getRouterLocation } from '@/selectors';

const Posts = () => {
  const [schema, setSchema] = useState('posts');
  const [redirect, setRedirect] = useState('/dashboard/posts');
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

  useEffect(() => {
    console.log('I have moutned');
  }, [router]);

  return (
    <Fragment>
      <section className={_['px-2']}>
        <div className={classnames(_['row-b'], _['py-1'], _.hidden, _['mt-1'])}>
          <div className={classnames(_['col-b-12'])}>
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

export default hot(Posts);
