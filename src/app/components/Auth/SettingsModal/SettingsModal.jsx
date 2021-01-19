import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { Map } from 'immutable';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import _ from '@styles/main.scss';
import { StyleSheet, style } from 'aphrodite';
import { getModalClientSchema, OverridedModal } from '~/app/selectors';

@Connect(
  (state) => ({
    clientSchema: getModalClientSchema(state),
  }),
  null,
)
export default class LogOutModal extends Component {
  static propTypes = {
    clientSchema: PropTypes.object,
  };

  static defaultProps = OverridedModal.MODAL_FACTORY();

  /**
   * Current modal state
   * fetched via redux
   *
   * @readonly
   * @memberof LogOutModal
   */
  get _getSettingsModalState() {
    const { clientSchema } = this.props;

    return clientSchema.has('logOutModal')
      ? clientSchema.get('logOutModal')
      : false;
  }

  render() {
    return (
      <Fragment>
        <CSSTransition
          in={this._getSettingsModalState}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <Modal
            style={OverridedModal.modalStyleFacade}
            isOpen={this._getSettingsModalState}
            onRequestClose={() => {
              console.log(123);
            }}
          >
            <div> Hello from Schema</div>
          </Modal>
        </CSSTransition>
      </Fragment>
    );
  }
}
