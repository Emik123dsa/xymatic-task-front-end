import { instanceOf } from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { fromEvent, Subscription, ReplaySubject, of } from 'rxjs';
import { distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import schema from '@styles/main.scss';
import _ from './LoginBoard.scss';
import { coercedInput } from '~/app/shared/coercedInput';

class LoginBoard extends Component {
  formSubject = new Subscription();

  formCredentialsSubject = new ReplaySubject();

  formCredentials = this.formCredentialsSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  formObject = null;

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };

    this.formObject = React.createRef();
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
          .subscribe((data) => {
            console.log(this.state);
          }),
      );

      this.formCredentials
        .pipe(
          tap((e) => e.persist()),
          mergeMap((e) => of(e?.target)),
        )
        .subscribe((target) => {
          this.setState((prevState) => ({
            ...prevState,
            [target.type]: target.value,
          }));
        });
    }, 0);
  }

  componentWillUnmount() {
    if (this.formSubject || this.formCredentialsSubject) {
      this.formSubject.unsubscribe();
      this.formCredentialsSubject.unsubscribe();
      this.formSubject = null;
      this.formCredentialsSubject = null;
    }
  }

  get _activeInputClass() {
    return function (payload) {
      return coercedInput(payload)
        ? schema['form-item_layout-active']
        : schema['form-item_layout'];
    };
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
                  schema['pb-2'],
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
                  schema['pb-2'],
                  schema['justify-content-center'],
                ]
                  .filter((e) => !!e)
                  .join(' ')}
              >
                <span className={schema['form-item-forgot_password']}>
                  Forgot password?
                </span>
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
