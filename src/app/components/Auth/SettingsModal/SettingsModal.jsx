import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { Map } from 'immutable';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import _ from '@styles/main.scss';
import { StyleSheet, style } from 'aphrodite';
import { setModalCurrentClientSchema } from '@/actions/modal.actions';
import { getModalClientSchema, OverridedModal } from '~/app/selectors';

@Connect(
  (state) => ({
    clientSchema: getModalClientSchema(state),
  }),
  {
    setModalCurrentClientSchema,
  },
)
export default class SettingsModal extends Component {
  static propTypes = {
    clientSchema: PropTypes.object,
    setModalCurrentClientSchema: PropTypes.func.isRequired,
  };

  static defaultProps = OverridedModal.MODAL_FACTORY();

  /**
   * Current modal state
   * fetched via redux
   *
   * @readonly
   * @memberof SettingsModal
   */
  get _getSettingsModalState() {
    const { clientSchema } = this.props;

    return clientSchema.has('SettingsModal')
      ? clientSchema.get('SettingsModal')
      : false;
  }

  render() {
    return (
      <CSSTransition
        in={this._getSettingsModalState}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <Modal
          style={OverridedModal.modalStyleFacade}
          isOpen={this._getSettingsModalState}
          onRequestClose={() =>
            this.props.setModalCurrentClientSchema(SettingsModal.name)
          }
        >
          <div> Hello from Schema</div>
        </Modal>
      </CSSTransition>
    );
  }
}
