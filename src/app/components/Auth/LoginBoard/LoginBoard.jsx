/* eslint-disable consistent-return */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  fromEvent,
  Subscription,
  ReplaySubject,
  BehaviorSubject,
  of,
  iif,
  EMPTY,
} from 'rxjs';
import { connect as Connect } from 'react-redux';
import { distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import isEqual from 'lodash/isEqual';
import schema from '@styles/main.scss';
import _ from './LoginBoard.scss';
import { coercedInput } from '~/app/shared/coerced.input';
import { setLoadAuth, setErrorMessage, resetErrorMessage } from '~/app/actions';
import { coercedToast } from '~/app/shared/coerced.toast';
import { FAILURE_AUTHORIZED } from '~/app/shared/helpers/messages';
import { classnames } from '~/app/shared/coerced.classnames';

@Connect(null, {
  setLoadAuth,
  setErrorMessage,
  resetErrorMessage,
})
class LoginBoard extends Component {
  formSubject = new Subscription();

  formCredentialsSubject = new ReplaySubject(1);

  formCredentials = this.formCredentialsSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  userCredentialsSubject = new BehaviorSubject({ email: null, password: null });

  formObject = null;

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };

    this.formObject = React.createRef();
  }

  static propTypes = {
    setLoadAuth: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func,
    setErrorMessage: PropTypes.func,
  };

  componentDidUpdate(prevProps, prevState) {
    this.userCredentialsSubject
      .pipe(
        mergeMap((data) =>
          iif(() => !isEqual(data, prevState), of(data), EMPTY),
        ),
      )
      .next(prevState);
  }

  componentDidMount() {
    setTimeout(() => {
      if (!(this.formSubject || this.formCredentials)) return;

      this.formSubject.add(
        fromEvent(this.formObject.current, 'submit')
          .pipe(
            tap((e) => {
              e.preventDefault();
              e.stopImmediatePropagation();
            }),
          )
          .subscribe((e) => {
            if (
              Reflect.ownKeys(this.state).some(
                (item) => !(this.state && this.state[item]),
              )
            ) {
              return coercedToast.failure(FAILURE_AUTHORIZED);
            }

            if (!isEqual(this.userCredentialsSubject.value, this.state)) {
              this.props.setLoadAuth(this.state);
              this.userCredentialsSubject.next(this.state);
            }
          }),
      );

      this.formCredentials
        .pipe(
          tap((e) => e?.persist()),
          mergeMap((e) => of(e?.target)),
        )
        .subscribe((target) => {
          this.setState((prevState) => ({
            ...prevState,
            [target.name]: target.value,
          }));
        });
    }, 0);
  }

  componentWillUnmount() {
    if (
      this.formSubject ||
      this.formCredentialsSubject ||
      this.userCredentialsSubject
    ) {
      this.formSubject.unsubscribe();
      this.formCredentialsSubject.unsubscribe();
      this.userCredentialsSubject.unsubscribe();

      this.formSubject = null;
      this.formCredentialsSubject = null;
      this.userCredentialsSubject = null;
    }
  }

  _activeInputClass(payload) {
    return coercedInput(payload)
      ? schema['form-item_layout-active']
      : schema['form-item_layout'];
  }

  render() {
    return (
      <Fragment>
        <div className={_['auth-wrapper']}>
          <div className={_['auth-wrapper_app']}>
            <Link className={_['auth-wrapper_app-link']} to="/">
              <span className={_['auth-wrapper_app-logotype']}></span>
              <h4>
                Task&nbsp;
                <span>App</span>
              </h4>
            </Link>
          </div>
          <div className={_['auth-wrapper_form']}>
            <form
              ref={this.formObject}
              id="authForm"
              acceptCharset="utf-8"
              name="auth-wrapper_form"
            >
              <div
                className={classnames(
                  schema['form-item'],
                  schema['row-b'],
                  schema['justify-content-center'],
                  schema['mb-1'],
                )}
              >
                <label
                  htmlFor="email"
                  className={classnames(
                    schema['form-item_label'],
                    schema['col-b-8'],
                  )}
                >
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onInput={(e) => this.formCredentialsSubject.next(e)}
                    autoComplete="off"
                  />
                  <div className={this._activeInputClass(this.state.email)}>
                    E-mail
                  </div>
                </label>
              </div>
              <div
                className={classnames(
                  schema['form-item'],
                  schema['row-b'],
                  schema['justify-content-center'],
                  schema['pb-2'],
                )}
              >
                <label
                  htmlFor="password"
                  className={classnames(
                    schema['form-item_label'],
                    schema['col-b-8'],
                  )}
                >
                  <input
                    id="password"
                    type="password"
                    name="password"
                    onInput={(e) => {
                      this.formCredentialsSubject.next(e);
                    }}
                    autoComplete="off"
                  />
                  <div className={this._activeInputClass(this.state.password)}>
                    Password
                  </div>
                </label>
              </div>
              <div
                className={classnames(
                  schema['form-item'],
                  schema['row-b'],
                  schema['pb-2'],
                  schema['justify-content-center'],
                )}
              >
                <span className={schema['form-item-forgot_password']}>
                  Forgot password?
                </span>
              </div>
              <div
                className={classnames(
                  schema['form-item'],
                  schema['row-b'],
                  schema['justify-content-center'],
                )}
              >
                <button
                  type="submit"
                  className={classnames(
                    schema.btn,
                    schema['btn-send'],
                    schema['col-b-7'],
                  )}
                  aria-pressed={false}
                >
                  <span className={schema['btn-icon-user']}></span>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LoginBoard;
