import moment from 'moment';

export const coercedSort = (data) => {
  if (!Array.isArray(data) && !data.length) return null;

  const attitudies = (items) =>
    items?.filter(({ attitude }) => attitude.startsWith('LIKE'))?.length;

  return data
    .sort((acc, item) => {
      if (!Object.prototype.hasOwnProperty.call(item, 'verbose')) return null;

      if (attitudies(acc?.verbose) < attitudies(item?.verbose)) {
        return -1;
      }
      if (attitudies(acc?.verbose) > attitudies(item?.verbose)) {
        return 1;
      }
      return 0;
    })
    .reverse()
    .map((item) => ({
      ...item,
      createdAt: moment(item?.createdAt).format('DD MMM, YYYY'),
    }));
};

export const coercedImpressions = ($data, $like) => {
  if ($data && !$data?.verbose?.length) return 0;
  const impressionLike = (type) =>
    $data &&
    $data?.verbose?.filter(({ attitude }) => attitude.startsWith(type)).length;
  return `${impressionLike($like)}`;
};
