/* eslint-disable no-return-assign */
import React, { Component, Fragment } from 'react';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import PropTypes from 'prop-types';

export class ClickOutside extends Component {
  clickOutside = new Subscription();

  elementRef = null;

  constructor(props) {
    super(props);
    this._removeEventListener = this._removeEventListener.bind(this);
    this.elementRef = React.createRef();
  }

  static propTypes = {
    emitOnClick: PropTypes.func,
    children: PropTypes.array,
    currentState: PropTypes.bool,
  };

  componentDidMount() {
    setTimeout(() => {
      this.clickOutside.add(
        fromEvent(document, 'click')
          .pipe(
            filter((e) => {
              e.preventDefault();
              e.stopImmediatePropagation();

              const clickTarget = e.target;

              return !this._removeEventListener(
                this.elementRef.current,
                clickTarget,
              );
            }),
          )
          .subscribe((e) => {
            this.props.emitOnClick(false);
          }),
      );

      if (this.buttonRef instanceof HTMLButtonElement) {
        this.clickOutside.add(
          fromEvent(this.buttonRef, 'click')
            .pipe(distinctUntilChanged())
            .subscribe((e) => {
              this.props.emitOnClick(!this.props.currentState);
            }),
        );
      }
    }, 0);
  }

  _removeEventListener(element, clickTarget) {
    return element === clickTarget || element.contains(clickTarget);
  }

  componentWillUnmount() {
    if (this.clickOutside) {
      this.clickOutside.unsubscribe();
      this.clickOutside = null;
    }
  }

  render() {
    return (
      <Fragment>
        <div ref={this.elementRef}>
          {React.Children.map(this.props.children, (mutableChild) => {
            if (mutableChild) {
              return React.cloneElement(mutableChild, {
                ref: (node) => (this.buttonRef = node),
              });
            }

            return null;
          })}
        </div>
      </Fragment>
    );
  }
}
