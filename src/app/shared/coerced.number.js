const THOUSAND_INDEX = 1000;
const COMMA = ',';

export const coercedThousandNumbers = ($amount) =>
  $amount > THOUSAND_INDEX
    ? `${($amount / THOUSAND_INDEX)
        .toFixed(2)
        .replace(/\./gi, COMMA)
        .toString()}k`
    : $amount;
