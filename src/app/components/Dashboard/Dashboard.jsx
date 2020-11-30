import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { getChartImpression } from '@/selectors';
import { loadChartsImpressionsEntity } from '@/actions';

@Connect(
  (state) => ({
    impressions: getChartImpression(state),
  }),
  {
    loadChartsImpressionsEntity,
  },
)
class Dashboard extends Component {
  static propTypes = {
    impressions: PropTypes.shape(),
    loadChartsImpressionsEntity: PropTypes.func,
  };

  componentDidMount() {}

  sendSchema = async () => {};

  render() {
    return (
      <div
        onClick={() => {
          this.props.loadChartsImpressionsEntity('impressions');
        }}
      >
        123
      </div>
    );
  }
}

export default Dashboard;
