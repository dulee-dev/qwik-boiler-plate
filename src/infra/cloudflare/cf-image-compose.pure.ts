import { dpiMax, dpiMin, srcWidths } from '~/libs/image';
import { calcSrc, calcSrcWidth, checkIsCFImage } from './cf-image-rule.pure';
import { SizesOption } from './image.type';
import { calcSizes } from '~/libs/image/image.pure';

export const calcSrcsetBetween = (
  src: string,
  range?: { max?: number; min?: number }
) => {
  const filtered = srcWidths.filter((a) => {
    if (range?.max && a > calcSrcWidth(range.max, dpiMax)) return false;
    if (range?.min && a < calcSrcWidth(range.min, dpiMin)) return false;
    return true;
  });

  const srcset = filtered
    .map((breakPoint) => `${src}/w${breakPoint} ${breakPoint}w`)
    .join(',');
  return srcset;
};

/**
 * html의 img src로 양식 변환
 * @param src cf일수도 있고, 아닐수도 있고 없을 수도 있음
 */
export const projectImageSrc = (src: string, maxWidth?: number): string => {
  const isCfImage = checkIsCFImage(src);
  if (!isCfImage) return src;

  const cfSrc = calcSrc(src, maxWidth);
  return cfSrc;
};

/**
 *
 * @param src cf일수도 있고, 아닐수도 있음
 * @param placeholder cf image로 가정
 */
export const projectNullableImageSrc = (
  src: string | null | undefined,
  placeholder: string,
  maxWidth?: number
): string => {
  if (typeof src !== 'string') return calcSrc(placeholder, maxWidth);

  return projectImageSrc(src, maxWidth);
};

/**
 * html의 img srcset로 양식 변환
 * @param src cf일수도 있고, 아닐수도 있고 없을 수도 있음
 */
export const projectImageSrcset = (
  src: string | undefined | null,
  range?: { max: number; min: number }
): string | undefined => {
  if (typeof src !== 'string') return undefined;

  const isCfImage = checkIsCFImage(src);
  if (!isCfImage) return undefined;

  const srcset = calcSrcsetBetween(src, range);
  return srcset;
};

/**
 * html의 img sizes 양식 변환
 * @param src cf일수도 있고, 아닐수도 있고 없을 수도 있음
 */
export const projectImageSizes = (
  src: string | undefined | null,
  options: SizesOption
): string | undefined => {
  if (typeof src !== 'string') return undefined;

  const isCfImage = checkIsCFImage(src);
  if (!isCfImage) return undefined;

  const sizes = calcSizes(options);
  return sizes;
};
