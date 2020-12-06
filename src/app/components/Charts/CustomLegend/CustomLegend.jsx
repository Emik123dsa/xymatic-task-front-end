import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from './CustomLegend.scss';
import { CustomAlertPeriodDate } from '../CustomAlertPeriodDate/CustomAlertPeriodDate';

export class CustomLegend extends PureComponent {
  static propTypes = {
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    title: PropTypes.string,
  };

  render() {
    const { payload, title } = this.props;

    return (
      <Fragment>
        <div className={_['custom-chart_legend']}>
          <div className={_['custom-chart_legend-title']}>
            <h4>{title}</h4>
          </div>
          <div className={_['custom-chart_legend-wrapper']}>
            {payload.map((item, index) => (
              <div
                className={_['custom-chart_legend-wrapper-item']}
                key={`item-${index}`}
              >
                {item.value}

                <span style={{ background: item.color }}></span>
              </div>
            ))}
            <CustomAlertPeriodDate />
          </div>
        </div>
      </Fragment>
    );
  }
}
