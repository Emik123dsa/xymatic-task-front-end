/* eslint-disable no-param-reassign */
import { isImmutable, List, Map } from 'immutable';
import { isMap, merge } from 'lodash';
import moment from 'moment';
import { isWSChart, Period } from '../selectors';
/**
 * Coerced current date schema fetched via redux store
 *
 * @param { } interval
 * @param {*} payload
 */
export const coercedMoment = (interval, payload) => {
  switch (interval) {
    case Period.RealTime:
      return moment(payload).format('HH:mm:ss');
    case Period.Today:
      return moment(payload).format('HH:mm');
    case Period.Yesterday:
      return moment(payload).format('HH:mm');
    case Period.Day:
      return moment(payload).format('DD MMM');
    case Period.Month:
      return moment(payload).format('MMM');
    case Period.Year:
      return moment(payload).format('YYYY');
    case Period.AllTime:
      return moment(payload).format('YYYY');
    default:
      return moment(payload).format('YYYY-MM-DD');
  }
};

export const coercedSeparatedMoment = (startDate, endDate, separator) => {
  const date = [];
  const currentDate = moment(startDate).startOf(separator);
  const lastDate = moment(endDate).startOf(separator);

  while (currentDate.add(1, `${separator}s`).diff(lastDate) <= 0) {
    date.push(currentDate.clone().toDate());
  }
  return date;
};

export const coercedCtx = (schema, dateType) => {
  try {
    if (!dateType) {
      throw new ReferenceError(`[Chart Time] - ${dateType} is not defined`);
    }

    const isSchema = schema.every(
      // eslint-disable-next-line no-bitwise
      (item) => List(item?.data).size > 0,
    );

    if (!isSchema) throw new ReferenceError(isSchema);

    const mutatedCtx = schema.reduce((acc, item) => {
      List(item?.data).forEach((_subItem) =>
        acc.push(isWSChart(dateType) ? Map(_subItem) : _subItem),
      );
      return acc;
    }, []);

    return List(mutatedCtx)
      .map((item) => Map(item).get('timestamp'))
      .reduce((acc, item) => (!acc.includes(item) ? [...acc, item] : acc), [])
      .map((timestamp) => {
        let mtbCtx = {};

        schema.forEach((arg, _iArgs) => {
          List(arg?.data).forEach((_arg, _iArg) => {
            if (
              !isWSChart(dateType)
                ? moment(_arg.get('timestamp')).isSame(timestamp)
                : moment(_arg?.timestamp).isSameOrBefore(timestamp)
            ) {
              mtbCtx = {
                ...mtbCtx,
                [`delta${arg?.type}`]: !isWSChart(dateType)
                  ? _arg.get('delta')
                  : _arg?.delta || 0,
                timestamp,
              };
            }
          });
        });

        return mtbCtx;
      })
      .filter((item) => {
        if (Reflect.ownKeys(item).length < schema.length + 1) {
          let acc = {};

          schema.forEach((arg, _iArg) => {
            if (
              !Object.prototype.hasOwnProperty.call(item, `delta${arg?.type}`)
            ) {
              acc = {
                ...acc,
                [`delta${arg?.type}`]: item[`delta${arg?.type}`] || 0,
              };
            }
          });

          return merge(item, acc, {});
        }

        return item;
      })
      .sort((acc, item) => {
        if (moment(acc?.timestamp).isBefore(item?.timestamp)) {
          return -1;
        }
        return 0;
      });
  } catch (e) {
    return [];
  }
};
