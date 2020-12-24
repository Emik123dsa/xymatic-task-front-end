import moment from 'moment';
import { Period } from '../selectors';
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
      return moment(payload).format('hh:mm A');
    case Period.Yesterday:
      return moment(payload).format('hh:mm A');
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
