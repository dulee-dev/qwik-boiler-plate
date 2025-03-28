import { css } from '~/styled-system/css';

export const s = {
  wrapper: css({
    display: 'flex',
    fd: 'column',
    ai: 'flex-end',
  }),

  button: css({
    bg: 'zinc.500',
    width: 'full',
    color: 'white',
  }),

  nav: css({
    width: 'full',
  }),

  navItem: css({
    bg: 'zinc.500',
    color: 'white',
    fontWeight: 'semibold',
    p: '0.5rem',
    fontSize: 'sm',
    display: 'block',
    width: 'full',
  }),
};
