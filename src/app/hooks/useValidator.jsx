import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import toNumber from 'lodash/toNumber';
import { useParams } from 'react-router';

const useValidator = (reg) => {
  const { schemaID } = useParams();

  if (isUndefined(schemaID)) return 0;
  if (!(reg instanceof RegExp)) return undefined;
  if (reg.test(schemaID)) return toNumber(schemaID);

  return undefined;
};

export default useValidator;
