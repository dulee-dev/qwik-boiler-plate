import { css } from '~/styled-system/css';

export const s = {
  wrapper: css({
    py: '1rem',
    pos: 'fixed',
    w: 'full',
    zIndex: 1,
    bg: 'white',
  }),

  logo: css({
    display: 'block',
    width: '4rem',

    tablet: {
      width: '5rem',
    },
  }),
};
