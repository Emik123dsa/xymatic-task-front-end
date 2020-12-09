import React, { Component, createContext } from 'react';
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
    children: PropTypes.object,
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

      this.clickOutside.add(
        fromEvent(this.elementRef.current, 'click')
          .pipe(distinctUntilChanged())
          .subscribe((e) => {
            this.props.emitOnClick(true);
          }),
      );
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
      <div ref={this.elementRef}>
        {React.Children.map(
          this.props.children,
          (mutableChildren) => mutableChildren,
        )}
      </div>
    );
  }
}
