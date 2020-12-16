import moment from 'moment';
/**
 * Coerced current date schema fetched via redux store
 *
 * @param { } interval
 * @param {*} payload
 */
export const coercedMoment = (interval, payload) => {
  switch (interval && interval.toLowerCase()) {
    case 'real time':
      return moment(payload).format('HH:mm:ss');
    case 'today':
      return moment(payload).format('HH');
    case 'yesterday':
      return moment(payload).format('HH');
    case 'day':
      return moment(payload).format('DD');
    case 'month':
      return moment(payload).format('MMMM');
    case 'year':
      return moment(payload).format('YYYY');
    case 'all time':
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
