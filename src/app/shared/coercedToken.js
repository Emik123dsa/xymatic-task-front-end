import JWTDecode, { InvalidTokenError } from 'jwt-decode';
import Cookies from 'js-cookie';
import { merge } from 'lodash';
import moment from 'moment';

export const coercedToken = (headers = {}) => {
  let authorizationHeaders = {};
  const configHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const token = Cookies.get('Bearer') || null;

  try {
    if (!token) {
      throw new ReferenceError(token);
    }

    const jwtDecoded = JWTDecode(token);
    const { exp, iat } = jwtDecoded;
    const currentTimestamp = moment().unix();

    if (!(exp - currentTimestamp)) {
      throw new InvalidTokenError(exp - iat);
    }

    authorizationHeaders = merge({}, authorizationHeaders, {
      Authorization: `Bearer ${token}`,
    });
  } catch (e) {
    if (e instanceof InvalidTokenError || e instanceof ReferenceError) {
      Cookies.remove('Bearer', { path: '/' });
      authorizationHeaders = merge({}, authorizationHeaders);
    }
  }

  return merge(headers, configHeaders, authorizationHeaders);
};

export const isTokenExists = () => !!Cookies.get('Bearer');
/**
 * Authenticate Web Socket
 * connection via Connection Params instead of Headers
 */
export const coercedWSToken = () => {
  const token = Cookies.get('Bearer') || null;
  return isTokenExists() ? { Bearer: token } : null;
};
