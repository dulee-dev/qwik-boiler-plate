import { css } from '~/styled-system/css';

export const s = {
  main: css({
    pt: '10rem',
    minH: 'calc(100vh - 11rem)',

    tablet: {
      pt: '12rem',
      minH: 'calc(100vh - 13rem)',
    },

    pb: '8rem',
    dp: 'flex',
    ai: 'center',
    fd: 'column',
  }),

  title: css({
    fontSize: '3xl',
    fontWeight: 'medium',
    textAlign: 'center',
    mb: '1.5rem',
    dp: 'flex',
    ai: 'center',

    tablet: {
      fontSize: '4xl',
    },
  }),

  checkIcon: css({
    color: 'ok.base',
    mr: '0.5rem',
  }),

  desc: css({
    textAlign: 'center',
    mb: '1rem',

    tablet: {
      mb: '2rem',
    },
  }),

  email: css({
    textDecoration: 'underline',
  }),
};
