import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { Map } from 'immutable';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import _ from '@styles/main.scss';
import { StyleSheet, style } from 'aphrodite';
import { getModalClientSchema, OverridedModal } from '~/app/selectors';
import { setModalCurrentClientSchema } from '../../../actions/modal.actions';

@Connect(
  (state) => ({
    clientSchema: getModalClientSchema(state),
  }),
  {
    setModalCurrentClientSchema,
  },
)
export default class LogoutModal extends Component {
  static propTypes = {
    clientSchema: PropTypes.object,
    setModalCurrentClientSchema: PropTypes.func.isRequired,
  };

  static defaultProps = OverridedModal.MODAL_FACTORY();

  /**
   * Get Current Manual Modal State
   *
   * @readonly
   * @memberof LogOutModal
   */
  get _getLogOutModalState() {
    const { clientSchema } = this.props;

    return clientSchema.has('LogoutModal')
      ? clientSchema.get('LogoutModal')
      : false;
  }

  render() {
    return (
      <Fragment>
        <CSSTransition
          in={this._getLogOutModalState}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <Modal
            style={OverridedModal.modalStyleFacade}
            isOpen={this._getLogOutModalState}
            onRequestClose={($event) => {
              this.props.setModalCurrentClientSchema(LogoutModal.name);
            }}
          >
            <div> Hello from Schema</div>
          </Modal>
        </CSSTransition>
      </Fragment>
    );
  }
}
