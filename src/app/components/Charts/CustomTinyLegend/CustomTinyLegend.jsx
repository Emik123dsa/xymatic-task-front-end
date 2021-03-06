import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import _ from './CustomTinyLegend.scss';
import { classnames } from '~/app/shared/coerced.classnames';

const CUSTOM_TINY_LEGEND_FACTORY = () => ({
  color: '#fff',
  type: 'Default',
});

@hot
export class CustomTinyLegend extends Component {
  static propTypes = {
    color: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = CUSTOM_TINY_LEGEND_FACTORY();

  render() {
    const { type, color } = this.props;
    return (
      <Fragment>
        <div className={_['custom-tiny-legend']}>
          <div className={_['custom-tiny-legend_wrapper']}>
            <div
              style={{ backgroundColor: color }}
              className={_['custom-tiny-legend_schema']}
            >
              <div className={_['custom-tiny-legend_label']}>
                <span className={_['custom-tiny-legend_title']}>{type}</span>
                <div className={_['custom-tiny-legend_icon']}>
                  <div
                    className={classnames(
                      _[`custom-tiny-legend_icon-${type}`],
                      _['custom-tiny-legend_icon-shape'],
                    )}
                  ></div>
                  <div className={_['custom-tiny-legend_overlay']}></div>
                </div>
              </div>
            </div>
            <div className={_['custom-tiny-legend_date']}></div>
          </div>
        </div>
      </Fragment>
    );
  }
}
