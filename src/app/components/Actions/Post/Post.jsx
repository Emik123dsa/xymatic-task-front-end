import React, { Fragment, useMemo } from 'react';
import { DisLikeIcon } from '@/components/Icons/Dislike';
import { LikeIcon } from '@/components/Icons/Like';
import schema from '@styles/_schema.scss';
import { coercedImpressions, coercedSort } from '~/app/shared/coerced.sort';
import _ from '../Actions.scss';
import { classnames } from '~/app/shared/coerced.classnames';

const ActionPost = (posts) => {
  const { findAllPosts } = posts?.posts;

  if (!Array.isArray(findAllPosts)) return null;

  const sortedPosts = useMemo(() => coercedSort(findAllPosts), [findAllPosts]);

  console.log(sortedPosts);

  return (
    <Fragment>
      <table className={_['actions-table']}>
        <thead className={_['actions-table_header']}>
          <tr className={_['actions-label']}>
            <td>Post name</td>
            <td>Likes / Dislikes</td>
            <td>Author</td>
            <td>Created date</td>
          </tr>
        </thead>
        <tbody className={_['actions-table_body']}>
          {sortedPosts &&
            sortedPosts.map((item, index) => (
              <tr key={`${index}-${item?.id}`}>
                <td className={_['actions-table_title']}>
                  <span>
                    {index + 1}
                    &#46;
                  </span>
                  &nbsp;{item?.title}
                </td>
                <td
                  className={classnames(
                    schema['d-flex'],
                    schema['align-center'],
                  )}
                >
                  <div
                    className={classnames(
                      schema['d-flex'],
                      schema['align-center'],
                    )}
                    style={{
                      marginLeft: '0.4rem',
                    }}
                  >
                    <LikeIcon />
                    <span className={_['actions-table_value']}>
                      {coercedImpressions(item, 'LIKE')}
                    </span>
                  </div>
                  <div
                    className={classnames(
                      schema['d-flex'],
                      schema['align-center'],
                      schema['ml-1'],
                    )}
                  >
                    <DisLikeIcon />
                    <span className={_['actions-table_value']}>
                      {coercedImpressions(item, 'DISLIKE')}
                    </span>
                  </div>
                </td>
                <td>{item?.author?.name}</td>
                <td>{item?.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default React.memo(ActionPost);
