import { SizesOption, SizesValue } from '~/infra/cloudflare/image.type';
import { breakpoints } from '../ux/ux.constant';
import { unitize } from '../speak/unitize.pure';

export const calcMinWidthMediaQuery = (minWidth: number, value: string) => {
  return `(min-width:${minWidth}px)${value}`;
};

export const calcSizes = (options: SizesOption) => {
  const { base, ...rest } = options;
  const queries: Partial<Record<keyof typeof breakpoints, SizesValue>> = rest;
  let sizes = '';

  for (const [key, value] of Object.entries(queries)) {
    const minWidth = +breakpoints[key as keyof typeof breakpoints];
    const query = calcMinWidthMediaQuery(
      minWidth,
      unitize(value.value, value.unit)
    );
    sizes += query + ',';
  }
  sizes += unitize(base.value, base.unit);

  return sizes;
};
