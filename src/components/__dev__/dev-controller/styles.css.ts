import { css } from '~/styled-system/css';

export const s = {
  wrapper: css({
    display: 'flex',
    fd: 'column',
    ai: 'flex-end',
    pos: 'fixed',
    right: '3rem',
    bottom: '3rem',
  }),

  button: css({
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: 'full',
    bg: 'violet.700',
  }),

  nav: css({
    bg: 'violet.700',
    color: 'white',
    fontWeight: 'semibold',
    p: '0.5rem',
    fontSize: 'sm',
  }),
};
