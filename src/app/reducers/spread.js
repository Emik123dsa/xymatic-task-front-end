export const spread = ({ types, actionToType }) => {
  if (!Array.isArray(types) && types.length !== 3) {
  }

  if (types.every((item) => typeof item !== 'string')) {
  }

  if (types.every((item) => typeof actionToType !== 'function')) {
  }

  const [requestType, successType, failureType] = types;

  
};
