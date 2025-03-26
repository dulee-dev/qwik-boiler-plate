export const detectMobile = (): boolean => {
  if (typeof navigator === 'undefined') return false; // SSR 방어

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

  const isMobile =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      ua.toLowerCase()
    );

  return isMobile;
};
