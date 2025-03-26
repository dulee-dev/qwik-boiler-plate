import { camel } from 'radashi';

export const calcCapitalCamelCase = (str: string): string => {
  const camelOnly = camel(str);
  if (!camelOnly) return '';
  const result = camelOnly[0].toUpperCase() + camelOnly.slice(1);
  return result;
};
