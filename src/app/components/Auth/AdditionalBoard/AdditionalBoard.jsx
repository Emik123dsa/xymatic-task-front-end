import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import schema from '@styles/main.scss';
import _ from './AdditionalBoard.scss';
import { classnames } from '~/app/shared/coerced.classnames';

const ADDITIONAL_BOARD_FACTORY = () => ({
  credentials: {
    title: '',
    description: '',
    button: '',
  },
});
/**
 *
 *
 * @class AdditionalBoard
 * @extends {Component}
 */
class AdditionalBoard extends Component {
  static propTypes = {
    credentials: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      buttonTitle: PropTypes.string,
      buttonTo: PropTypes.string,
    }),
  };

  static defaultProps = ADDITIONAL_BOARD_FACTORY();

  render() {
    const { credentials } = this.props;

    return (
      <Fragment>
        <div className={_['additional-board-wrapper']}>
          <div className={_['additional-board-wrapper_credentials']}>
            <div
              className={classnames(
                schema.row,
                schema['justify-content-center'],
                schema['mb-3'],
              )}
            >
              <h1
                className={classnames(
                  schema['col-12'],
                  schema['col-md-12'],
                  _['additional-board-wrapper_title'],
                )}
              >
                {credentials.title}
              </h1>
            </div>
            <div
              className={classnames(
                schema.row,
                schema['justify-content-center'],
                schema['mb-4'],
              )}
            >
              <div
                className={classnames(
                  schema['col-9'],
                  schema['col-md-12'],
                  _['additional-board-wrapper_description'],
                )}
              >
                {credentials.description}
              </div>
            </div>
            <div
              className={classnames(
                schema.row,
                schema['justify-content-center'],
              )}
            >
              <Link
                to={{
                  pathname: credentials.buttonTo,
                }}
                className={classnames(
                  schema.btn,
                  schema['btn-sign-up'],
                  schema['col-b-7'],
                )}
              >
                {credentials.buttonTitle}
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AdditionalBoard;
