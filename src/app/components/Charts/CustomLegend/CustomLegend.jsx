import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CustomAlterPeriodDate } from '@/components/Charts/CustomAlterPeriodDate/CustomAlterPeriodDate';
import _ from './CustomLegend.scss';

export class CustomLegend extends PureComponent {
  static propTypes = {
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    types: PropTypes.array,
    title: PropTypes.string,
  };

  render() {
    const { payload, title, types } = this.props;

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
                {(types && types[index]) || null}
                <span style={{ background: item.color }}></span>
              </div>
            ))}
            <CustomAlterPeriodDate types={types} />
          </div>
        </div>
      </Fragment>
    );
  }
}
