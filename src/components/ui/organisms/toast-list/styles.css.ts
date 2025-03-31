import { css } from '~/styled-system/css';

export const s = {
  list: css({
    dp: 'flex',
    fd: 'column-reverse',
    ai: 'flex-start',
    pos: 'fixed',
    bottom: '3rem',
    left: '3rem',
    zIndex: '10',

    tablet: {
      bottom: '5rem',
      left: '5rem',
    },

    desktop: {
      bottom: '7rem',
      left: '7rem',
    },
  }),

  toast: css({
    px: '1.5rem',
    py: '0.75rem',
    borderRadius: '4px',
    dp: 'flex',
    ai: 'center',
    bg: 'white',
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)',

    mt: '1rem',

    _last: {
      mt: '0rem',
    },
  }),

  ok: css({
    color: 'ok.base',
  }),

  warn: css({
    color: 'warn.base',
  }),

  error: css({
    color: 'error.base',
  }),

  show: css({
    animationStyle: 'slide-fade-in',
    animationFillMode: 'forwards',
  }),

  remove: css({
    animationStyle: 'dismiss-fade-out',
    animationFillMode: 'forwards',
  }),

  toastIcon: css({
    mr: '0.5rem',
  }),

  toastText: css({}),

  toastBtn: css({
    fontSize: 'xs',
    ml: '2rem',
    color: 'gray.600',
  }),
};
