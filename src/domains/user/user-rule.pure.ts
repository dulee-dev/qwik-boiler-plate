import {
  emailRegExp,
  pwNoLengthRegExp,
  pwRegExp,
} from '~/utils/regexp/regexp.pure';

export const checkIsEmail = (target: string): boolean => {
  const ok = emailRegExp.test(target);
  return ok;
};

export const checkIsPw = (target: string): boolean => {
  const ok = pwRegExp.test(target);
  return ok;
};

export const checkIsPwNoLength = (target: string): boolean => {
  const ok = pwNoLengthRegExp.test(target);
  return ok;
};
