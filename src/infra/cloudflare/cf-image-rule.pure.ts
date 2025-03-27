import { chain, last } from 'radashi';
import { dpiMax, SrcWidth, srcWidthMax, srcWidths } from '~/libs/image';
import { IMAGE_DELIVERY_URL_REG_EXP } from './image';

export const calcIdFromUploadUrl = (uploadUrl: string) => {
  const id = chain(
    (uploadUrl: string) => uploadUrl.split('/'),
    (strings) => last(strings)
  )(uploadUrl);
  return id;
};

export const calcSrcUrlFromUploadUrl = (uploadUrl: string) => {
  const src = uploadUrl.replace('upload.', '');
  return src;
};

export const appendFileToFormData = (file: File, name: string) => {
  const formData = new FormData();
  const originalName = file.name;
  const pieces = originalName.split('.');
  const ext = pieces[pieces.length - 1];
  const fullName = name + '.' + ext;

  formData.append('file', file, fullName);
  return formData;
};

export const calcSrcWidth = (w?: number, dpi: number = dpiMax): SrcWidth => {
  if (w === undefined) return srcWidthMax;

  const srcWidth = srcWidths;

  let result = srcWidthMax;
  srcWidth.some((c) => {
    const larger = c > w * dpi;
    if (larger) {
      result = c;
      return true;
    }
  });

  return result;
};

export const calcSrc = (
  src: string,
  maxWidth?: number,
  dpi: number = dpiMax
): string => {
  const breakPoint = calcSrcWidth(maxWidth, dpi);
  const result = src + '/w' + breakPoint;
  return result;
};

export const checkIsCFImage = (src: string): boolean => {
  return IMAGE_DELIVERY_URL_REG_EXP.test(src);
};

export const calcSrcset = (src: string, srcWidths: SrcWidth[]) => {
  const srcset = srcWidths
    .map((srcWidth) => `${src}/w${srcWidth} ${srcWidth}w`)
    .join(',');
  return srcset;
};
