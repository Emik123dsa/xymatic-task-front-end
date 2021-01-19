/* eslint-disable consistent-return */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  fromEvent,
  Subscription,
  ReplaySubject,
  BehaviorSubject,
  of,
  EMPTY,
  iif,
} from 'rxjs';
import { connect as Connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { distinctUntilChanged, mergeMap, pluck, tap } from 'rxjs/operators';
import { setErrorMessage, resetErrorMessage, setLoadNewUser } from '@/actions';
import schema from '@styles/main.scss';
import _ from './SignUpBoard.scss';
import { coercedInput } from '~/app/shared/coercedInput';
import {
  FAILURE_AUTHORIZED,
  NOT_SAME_PASSWORD,
} from '~/app/shared/helpers/messages';
import { coercedToast } from '~/app/shared/coercedToast';

@Connect(null, {
  setLoadNewUser,
  setErrorMessage,
  resetErrorMessage,
})
class SignUpBoard extends Component {
  formSubject = new Subscription();

  formCredentialsSubject = new ReplaySubject();

  formCredentials = this.formCredentialsSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  formObject = null;

  userSignUpSubject = new BehaviorSubject(this.state);

  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      password: null,
      password_repeat: null,
    };

    this.formObject = React.createRef();
  }

  static propTypes = {
    setLoadNewUser: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func,
    setErrorMessage: PropTypes.func,
  };

  componentDidUpdate(prevProps, prevState) {
    this.userSignUpSubject
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

            if (!isEqual(this.state.password, this.state.password_repeat)) {
              return coercedToast.failure(NOT_SAME_PASSWORD);
            }

            const { name, email, password } = this.state;

            if (!isEqual(this.userSignUpSubject.value, this.state)) {
              this.props.setLoadNewUser({
                userInput: {
                  name,
                  email,
                  password,
                },
              });
              this.userSignUpSubject.next(this.state);
            }
          }),
      );

      this.formCredentials
        .pipe(
          tap((e) => e.persist()),
          pluck('target'),
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
      this.userSignUpSubject
    ) {
      this.formSubject.unsubscribe();
      this.formCredentialsSubject.unsubscribe();
      this.userSignUpSubject.unsubscribe();

      this.formSubject = null;
      this.formCredentialsSubject = null;
      this.userSignUpSubject = null;
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
        <div className={_['sign-up-wrapper']}>
          <div className={_['sign-up-wrapper_app']}>
            <Link className={_['sign-up-wrapper_app-link']} to="/">
              <span className={_['sign-up-wrapper_app-logotype']}></span>
              <h4>
                Task&nbsp;
                <span>App</span>
              </h4>
            </Link>
          </div>
          <div className={_['sign-up-wrapper_form']}>
            <form
              ref={this.formObject}
              id="signUpForm"
              acceptCharset="utf-8"
              name="sign-up-wrapper_form"
            >
              <div
                className={[
                  schema['form-item'],
                  schema['row-b'],
                  schema['justify-content-center'],
                  schema['mb-1'],
                ]
                  .filter((e) => !!e)
                  .join(' ')}
              >
                <label
                  htmlFor="name"
                  className={[schema['form-item_label'], schema['col-b-8']]
                    .filter((e) => !!e)
                    .join(' ')}
                >
                  <input
                    id="name"
                    type="text"
                    name="name"
                    onInput={(e) => {
                      this.formCredentialsSubject.next(e);
                    }}
                    autoComplete="off"
                  />
                  <div className={this._activeInputClass(this.state.name)}>
                    Name
                  </div>
                </label>
              </div>

              <div
                className={[
                  schema['form-item'],
                  schema['row-b'],
                  schema['justify-content-center'],
                  schema['mb-1'],
                ]
                  .filter((e) => !!e)
                  .join(' ')}
              >
                <label
                  htmlFor="email"
                  className={[schema['form-item_label'], schema['col-b-8']]
                    .filter((e) => !!e)
                    .join(' ')}
                >
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onInput={(e) => {
                      this.formCredentialsSubject.next(e);
                    }}
                    autoComplete="off"
                  />
                  <div className={this._activeInputClass(this.state.email)}>
                    E-mail
                  </div>
                </label>
              </div>
              <div
                className={[
                  schema['form-item'],
                  schema['row-b'],
                  schema['justify-content-center'],
                  schema['mb-1'],
                ]
                  .filter((e) => !!e)
                  .join(' ')}
              >
                <label
                  htmlFor="password"
                  className={[schema['form-item_label'], schema['col-b-8']]
                    .filter((e) => !!e)
                    .join(' ')}
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
                className={[
                  schema['form-item'],
                  schema['row-b'],
                  schema['justify-content-center'],
                  schema['pb-2'],
                ]
                  .filter((e) => !!e)
                  .join(' ')}
              >
                <label
                  htmlFor="password_repeat"
                  className={[schema['form-item_label'], schema['col-b-8']]
                    .filter((e) => !!e)
                    .join(' ')}
                >
                  <input
                    id="password_repeat"
                    type="password"
                    name="password_repeat"
                    onInput={(e) => {
                      this.formCredentialsSubject.next(e);
                    }}
                    autoComplete="off"
                  />
                  <div
                    className={this._activeInputClass(
                      this.state.password_repeat,
                    )}
                  >
                    Password Again
                  </div>
                </label>
              </div>

              <div
                className={[
                  schema['form-item'],
                  schema['row-b'],
                  schema['justify-content-center'],
                ]
                  .filter((e) => !!e)
                  .join(' ')}
              >
                <button
                  type="submit"
                  className={[schema.btn, schema['btn-send'], schema['col-b-7']]
                    .filter((e) => !!e)
                    .join(' ')}
                >
                  <span className={schema['btn-icon-user']}></span>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignUpBoard;
