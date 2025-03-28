import { css } from '~/styled-system/css';

export const s = {
  main: css({
    pt: '8rem',
    pb: '8rem',
    minH: 'calc(100vh - 11rem)',

    tablet: {
      pt: '10rem',
      minH: 'calc(100vh - 13rem)',
    },
  }),

  form: css({
    mx: 'auto',
  }),
};
