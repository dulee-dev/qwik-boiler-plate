import { unitize } from '../colloquial/unitize.pure';
import { breakpoints } from '../ux/ux.constant';
import { SizesOption, SizesValue } from './image.type';

export const calcMaxWidthMediaQuery = (maxWidth: number, value: string) => {
  return `(max-width:${maxWidth}px)${value}`;
};

export const calcSizes = (options: SizesOption) => {
  const { base, ...rest } = options;
  const queries: Partial<Record<keyof typeof breakpoints, SizesValue>> = rest;
  let sizes = '';

  for (const [key, value] of Object.entries(queries)) {
    const maxWidth = +breakpoints[key as keyof typeof breakpoints];
    const query = calcMaxWidthMediaQuery(
      maxWidth,
      unitize(value.value, value.unit),
    );
    sizes += query + ',';
  }
  sizes += unitize(base.value, base.unit);

  return sizes;
};
