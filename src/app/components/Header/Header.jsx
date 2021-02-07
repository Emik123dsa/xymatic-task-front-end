import React, { Component } from 'react';
import PropTypes from 'prop-types';
import schema from '@styles/main.scss';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pairwise, pluck, tap } from 'rxjs/operators';
import { classnames } from '@/shared/coerced.classnames';
import { coercedInput } from '@/shared/coerced.input';
import { hot } from 'react-hot-loader/root';
import { connect as Connect } from 'react-redux';
import { StyleSheet } from 'aphrodite';
import _ from './Header.scss';
import { getRouterLocation } from '~/app/selectors';
import { coercedString } from '~/app/shared/coerced.string';

const headerStyleFactory = StyleSheet.create({
  default: {
    paddingBottom: '1rem',
  },
  custom: {
    padding: '1rem',
  },
});

@hot
@Connect((state) => ({
  location: getRouterLocation(state),
}))
class Header extends Component {
  static propTypes = {
    location: PropTypes.shape(),
  };

  _searchParamsSubject = new BehaviorSubject(null);

  _searchParams = this._searchParamsSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(props) {
    super(props);

    this.state = {
      searchParams: null,
    };
  }

  componentDidMount() {
    this._searchParams
      .pipe(
        tap((e) => e?.persist()),
        pluck('target'),
        pairwise(),
      )
      .subscribe(([oldValue, newValue]) => {
        this.setState((prevState) => ({
          ...prevState,
          [newValue?.name]: newValue?.value,
        }));
      });
  }

  _activeInputClass(payload) {
    return coercedInput(payload)
      ? schema['form-item_layout-active']
      : schema['form-item_layout'];
  }

  componentWillUnmount() {
    if (this._searchParamsSubject) {
      this._searchParamsSubject.unsubscribe();
      this._searchParamsSubject = null;
    }
  }

  get _canonicalFactory() {
    const { location } = this.props;
    let canonical = null;

    if (!location.has('pathname')) return null;

    const pathNameReg = /\//gi;
    const isNotValidNumber = /^\d+$/gi;

    let matches = location?.get('pathname')?.split(pathNameReg);

    if (Array.isArray(matches) && matches?.length > 0) {
      matches = matches
        ?.filter((match) => !!match)
        ?.filter((match) => !isNotValidNumber.test(match));
    }

    canonical =
      matches?.length < 1
        ? matches && matches[matches.length - 1]
        : matches.pop();

    return canonical ? coercedString(canonical) : null;
  }

  render() {
    return (
      <header className={_.header}>
        <div className={_['header-wrapper']}>
          <div
            className={classnames(
              schema['row-b'],
              schema['justify-content-center'],
              schema['align-center'],
            )}
          >
            <div className={schema['col-b-9']}>
              <h2 className={_['header-wrapper_analytics-title']}>
                {this._canonicalFactory} overview
              </h2>
            </div>
            <div className={schema['col-b-3']}>
              <div className={classnames(schema['form-item'], schema['row-b'])}>
                <label
                  htmlFor="searchParams"
                  className={classnames(
                    schema['form-item_label'],
                    schema['col-b-12'],
                  )}
                >
                  <input
                    id="searchParams"
                    type="text"
                    name="searchParams"
                    onInput={($event) => this._searchParamsSubject.next($event)}
                    autoComplete="off"
                  />
                  <div
                    className={this._activeInputClass(this.state.searchParams)}
                  >
                    Search...
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
