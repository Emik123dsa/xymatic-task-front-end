/// /////////////////////////////////////////////////
// Coerced string to upper case
/// ////////////////////////////////////////////////
export const coercedString = ($payload) =>
  `${$payload.charAt(0).toUpperCase()}${$payload.slice(1)}`;
