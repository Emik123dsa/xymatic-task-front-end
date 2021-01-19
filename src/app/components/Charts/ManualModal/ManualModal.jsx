import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { Map } from 'immutable';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import _ from '@styles/main.scss';
import { OverridedModal, getModalClientSchema } from '~/app/selectors';

@Connect(
  (state) => ({
    clientSchema: getModalClientSchema(state),
  }),
  null,
)
export default class ManualModal extends Component {
  static propTypes = {
    clientSchema: PropTypes.object,
  };

  static defaultProps = OverridedModal.MODAL_FACTORY();

  /**
   * Get Current Manual Modal State
   *
   * @readonly
   * @memberof ManualModal
   */
  get _getManualModalState() {
    const { clientSchema } = this.props;

    return clientSchema.has('manualModal')
      ? clientSchema.get('manualModal')
      : false;
  }

  render() {
    return (
      <Fragment>
        <CSSTransition
          in={this._getManualModalState}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <Modal
            style={OverridedModal.modalStyleFacade}
            isOpen={this._getManualModalState}
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
