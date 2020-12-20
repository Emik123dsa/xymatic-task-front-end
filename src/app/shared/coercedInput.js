/**
 * Coercion For input
 * @param { Coerced Letters} payload
 */
export const coercedInput = (payload) => {
  if (typeof payload !== 'string') return false;
  return Object.keys(payload) > 0;
};
