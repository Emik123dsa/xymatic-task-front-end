/* eslint-disable arrow-body-style */

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const createRequestSchema = (base) => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

export const action = (type, payload = {}) => {
  return { type, ...payload };
};
