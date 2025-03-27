import { css } from '~/styled-system/css';

export const s = {
  wrapper: css({
    py: '1rem',
    pos: 'fixed',
    w: 'full',
    zIndex: 1,
    bg: 'white',
  }),

  container: css({
    dp: 'flex',
    ai: 'center',
    jc: 'space-between',
  }),

  logo: css({
    display: 'block',
    width: '4rem',

    tablet: {
      width: '5rem',
    },
  }),

  navUl: css({
    dp: 'flex',
    ai: 'stretch',
  }),

  navItem: css({
    px: '1rem',
    fontSize: 'large',
  }),

  signInBtn: css({}),
};
