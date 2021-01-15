import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { Map } from 'immutable';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import _ from '@styles/main.scss';
import { StyleSheet } from 'aphrodite';
import { getModalClientSchema } from '~/app/selectors';

const modal = StyleSheet.create({
  manual: {
    zIndex: '9999 !important',
  },
});

export const MANUAL_MODAL_FACTORY = () => ({
  clientSchema: null,
});

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

  static defaultProps = MANUAL_MODAL_FACTORY();

  get _getManualModalState() {
    const { clientSchema } = this.props;
    return clientSchema.has('manualModal')
      ? clientSchema.get('manualModal')
      : false;
  }

  render() {
    return (
      // <CSSTransition
      //   in={this._getManualModalState}
      //   timeout={300}
      //   classNames="dropdown"
      //   unmountOnExit
      // >
      <Modal style={modal.manual} class={_.modal} isOpen={true}>
        <div> Hello from Schema</div>
      </Modal>
      // </CSSTransition>
    );
  }
}
