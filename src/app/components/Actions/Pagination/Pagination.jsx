import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { getChartRowsAmount, getSidebarFeatures } from '@/selectors';
import { List, Seq, Map } from 'immutable';

const PAGINATION_FACTORY = () => ({
  rows: [],
  chart: null,
});
/**
 * Plain pagination
 * factory
 *
 * @export
 * @class Pagination
 * @extends {Component}
 */
@Connect(
  (state) => ({
    rows: getChartRowsAmount(state),
    features: getSidebarFeatures(state),
  }),
  null,
)
export default class Pagination extends Component {
  static propTypes = {
    rows: PropTypes.object,
    features: PropTypes.object,
    schema: PropTypes.string,
  };

  static defaultProps = PAGINATION_FACTORY();

  get _rowsSchemaFactory() {
    const { rows, schema } = this.props;
    if (!List.isList(rows)) return null;
    return Seq(rows)
      .valueSeq()
      .toArray()
      .filter((row) => Map.isMap(row))
      .find((row) => row.has('type') && row.get('type').endsWith(schema))
      .get('count');
  }

  render() {
    console.log(this._rowsSchemaFactory);
    return <div>{}</div>;
  }
}
