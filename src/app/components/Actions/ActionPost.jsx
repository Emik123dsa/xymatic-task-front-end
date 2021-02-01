import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const actionsSortPosts = (posts) => {
  if (!Array.isArray(posts) && !posts.length) return null;

  const attitudies = (items) =>
    items?.filter(({ attitude }) => attitude.startsWith('LIKE'))?.length;

  return posts.sort((acc, item) => {
    if (!Object.prototype.hasOwnProperty.call(item, 'verbose')) return null;

    if (
      moment(acc?.createdAt).isBefore(item?.createdAt) &&
      attitudies(acc?.verbose) < attitudies(item?.verbose)
    ) {
      return 1;
    }
    if (
      moment(acc?.createdAt).isAfter(item?.createdAt) &&
      attitudies(acc?.verbose) > attitudies(item?.verbose)
    ) {
      return -1;
    }
    return 0;
  });
};

const ActionPost = (posts) => {
  const { findAllPosts } = posts?.posts;

  if (!Array.isArray(findAllPosts)) return null;

  const sortedPosts = useMemo(() => actionsSortPosts(findAllPosts), [
    findAllPosts,
  ]);

  return (
    <div>
      <table>
        {/* <thead> </thead> */}
        <tbody>
          {sortedPosts &&
            sortedPosts.map((item, index) => (
              <tr key={`${index}-${item?.id}`}>
                <td>{item.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

ActionPost.propTypes = {
  posts: PropTypes.object,
};

export default React.memo(ActionPost);
