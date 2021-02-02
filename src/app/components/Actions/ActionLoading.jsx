import { css } from 'aphrodite';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import schema from '@styles/_schema.scss';
import { styles } from '~/app/shared/coerced.styles';
import _ from './ActionLoading.scss';
import { classnames } from '~/app/shared/coerced.classnames';

const ActionLoading = ({ series }, ...props) => {
  if (!Array.isArray(series)) return null;
  return (
    <Fragment>
      <div className={_['action-loading']}>
        {series.map((serie, index) => (
          <li
            key={index}
            className={classnames(schema['col-b-12'], schema['pb-2'])}
            role="presentation"
          >
            <span className={css(styles.fadeIn)} role="tab">
              <ContentLoader
                speed={1}
                width="100%"
                height={30}
                backgroundColor="#1c2430"
                backgroundOpacity="0.2"
                foregroundColor="#1c2430"
              >
                <rect x="0" y="0" rx="10" ry="10" width="15%" height="100%" />
                <rect x="20%" y="0" rx="10" ry="10" width="30%" height="100%" />
                <rect x="55%" y="0" rx="10" ry="10" width="30%" height="100%" />
                <rect x="89%" y="0" rx="10" ry="10" width="10%" height="100%" />
              </ContentLoader>
            </span>
          </li>
        ))}
      </div>
    </Fragment>
  );
};

ActionLoading.propTypes = {
  series: PropTypes.array,
};

export default ActionLoading;
