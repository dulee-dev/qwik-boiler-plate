import { last } from 'radashi';
import { ConstObjectValue } from '~/utils/type';

export const dpiMax = 3;
export const dpiMin = 1;

export const srcWidth = {
  32: 32,
  64: 64,
  128: 128,
  256: 256,
  360: 360,
  420: 420,
  600: 600,
  768: 768,
  992: 992,
  1280: 1280,
  1536: 1536,
  1920: 1920,
  2240: 2240,
  2560: 2560,
  3200: 3200,
} as const;

export type SrcWidth = ConstObjectValue<typeof srcWidth>;

export const srcWidths = Object.values(srcWidth);

export const srcWidthMax = last(srcWidths) as SrcWidth;
